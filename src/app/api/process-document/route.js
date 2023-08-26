import { NextResponse } from 'next/server';

import { supabase } from '../supabase';
import { extractDocumentContent } from './contentExtractor';
import { fetchDocument, saveDocument } from './database';
import { download } from './supabaseDownload';
import { generateDocumentTitle } from './titleGenerator';

export const POST = async (req) => {
  const { checksum, fileName } = await req.json();

  const { data, error: fetchError } = await fetchDocument({ checksum });
  if (fetchError) {
    console.error(error);
    return NextResponse.json({ error: fetchError }, { status: 500 });
  }

  if (data) {
    return NextResponse.json({ ...data }, { status: 200 });
  }

  const { file, error } = await download(`${checksum}.pdf`);
  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }

  const channel = supabase().channel(`upload:${checksum}`);
  channel.subscribe((status) => {
    console.log({ status });
    if (status in ['TIMED_OUT', 'CLOSED', 'CHANNEL_ERROR']) {
      sendError(channel, status);
    }
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
  const { chunks } = await extractDocumentContent(file);

  sendProgress(channel, 'Saving document details...');
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
  generateDocumentTitle(checksum, channel).then(({ title }) => {
    console.log({ title });

    channel.send({
      type: 'broadcast',
      event: 'upload:complete',
      payload: {
        ...data,
        title
      }
    });
  });

  return;
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
