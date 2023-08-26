import { NextResponse } from 'next/server';

import { supabase } from '../supabase';
import { fetchDocument, saveDocument } from './database';
import { generateEmbeddings } from './embeddingGenerator';
import { generateDocumentTitle } from './titleGenerator';

export const POST = async (req) => {
  const { checksum, fileName, content } = await req.json();

  const { data, error: fetchError } = await fetchDocument({ checksum });
  if (fetchError) {
    console.error(fetchError);
    return NextResponse.json({ error: fetchError }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ ...data }, { status: 200 });
  }

  const channel = supabase().channel(`upload:${checksum}`);
  channel.subscribe((status) => {
    console.log({ status });
    if (status in ['TIMED_OUT', 'CLOSED', 'CHANNEL_ERROR']) {
      sendError(channel, status);
    }
  });
  sendProgress(channel, 'Processing document...');

  processDocumentInBackground({ channel, content, fileName, checksum });

  return NextResponse.json({}, { status: 201 });
};

const processDocumentInBackground = async ({
  channel,
  content,
  fileName,
  checksum
}) => {
  sendProgress(channel, 'Saving document details...');
  const chunks = await generateEmbeddings(content);

  messageForLongDocs(chunks, channel);
  const { data, error } = await saveDocument({
    fileName,
    checksum,
    chunks
  });

  if (error) {
    sendError(channel, error);
    return;
  }

  sendProgress(channel, 'Generating document title...');
  const { title } = await generateDocumentTitle(checksum, channel);
  channel.send({
    type: 'broadcast',
    event: 'upload:complete',
    payload: {
      ...data,
      title
    }
  });
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

const sendError = (channel, error) => {
  channel.send({
    type: 'broadcast',
    event: 'upload:error',
    payload: {
      error
    }
  });
};

const messageForLongDocs = (chunks, channel) => {
  if (chunks.content.length > 10) {
    sendProgress(
      channel,
      "Uploading a big document, aren't we?\nThis might take a while..."
    );
  }
};
