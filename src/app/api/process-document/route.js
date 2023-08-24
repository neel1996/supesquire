import { loadQAChain } from 'langchain/chains';
import { Document } from 'langchain/document';
import { NextResponse } from 'next/server';

import { llm } from '../openai';
import { supabase } from '../supabase';
import { fetchDocument, saveDocument } from './database';
import { extractDocumentContent } from './documentProcessor';
import { download } from './supabaseDownload';

export const POST = async (req) => {
  const { checksum, fileName } = await req.json();

  const { file, error } = await download(`${checksum}.pdf`);
  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  const { data, error: fetchError } = await fetchDocument({ checksum });
  if (fetchError) {
    console.error(error);
    return NextResponse.json({ error: fetchError }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ ...data }, { status: 200 });
  }

  const channel = supabase().channel(`upload:${checksum}`);
  channel.subscribe((status) => {
    console.log({ status });
  });
  sendProgress(channel, 'Processing document...');

  processDocumentInBackground({ channel, file, fileName, checksum });

  return NextResponse.json({}, { status: 201 });
};

const processDocumentInBackground = async ({
  channel,
  file,
  fileName,
  checksum
}) => {
  sendProgress(channel, 'Extracting document content...');
  const { content, chunks } = await extractDocumentContent(file);

  sendProgress(channel, 'Saving document...');
  const title = await documentTitle(content);

  sendProgress(channel, 'Saving document details...');
  const { data, error } = await saveDocument({
    fileName,
    checksum,
    docContent: content,
    chunks,
    title
  });

  if (error) {
    channel.send({
      type: 'broadcast',
      event: 'upload:error',
      payload: {
        error
      }
    });
    return;
  }

  channel.send({
    type: 'broadcast',
    event: 'upload:complete',
    payload: {
      ...data
    }
  });

  return;
};

const documentTitle = async (content) => {
  const chain = loadQAChain(llm, {
    type: 'stuff',
    verbose: true
  });

  const { text } = await chain.call({
    input_documents: [
      new Document({
        pageContent: content?.slice(0, 6000)
      })
    ],
    question:
      'What is the title of this document?\nRespond only the title and nothing else\nDo not include any quotations or a prefix in the title\nThe title should not be more than 10 words long'
  });

  return text;
};

const sendProgress = (channel, message) => {
  channel.send({
    type: 'broadcast',
    event: 'upload:progress',
    payload: {
      message
    }
  });
};
