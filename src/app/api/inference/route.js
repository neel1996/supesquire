import { ChatMessageHistory } from 'langchain/memory';
import { NextResponse } from 'next/server';

import { chatMemory } from '../openai';
import { supabase } from '../supabase';
import { infer } from './service';

export const POST = async (req) => {
  const { documentId, message } = await req.json();
  saveChatToBuffer(documentId, message, 'human');

  const channel = supabase().channel(documentId);
  channel.subscribe((status) => {
    console.log({ status });
  });

  const { error } = await saveChat(channel, {
    message,
    checksum: documentId,
    actor: 'human'
  });
  if (error) return;

  infer({ documentId, question: message })
    .then(async ({ answer, context, error }) => {
      if (error) {
        emitError(error, documentId);
      }

      const { error: saveError } = await saveChat(channel, {
        message: answer,
        checksum: documentId,
        actor: 'ai'
      });
      if (saveError) return;
      saveChatToBuffer(documentId, answer, context, 'ai');

      channel.send({
        type: 'broadcast',
        event: 'ai_message',
        payload: {
          message: answer
        }
      });
    })
    .catch((error) => {
      emitError(channel, error);
    });

  return NextResponse.json({});
};

const emitError = (channel, error) => {
  channel.send({
    type: 'broadcast',
    event: 'chat_error',
    payload: {
      error
    }
  });
};

const saveChat = async (channel, chatRecord) => {
  const { error } = await supabase()
    .from(process.env.NEXT_PUBLIC_SUPABASE_CHAT_RECORDS_TABLE)
    .insert({
      ...chatRecord
    });

  if (error) {
    console.error(error);
    channel.send({
      type: 'broadcast',
      event: 'chat_error',
      payload: {
        error
      }
    });
    return { error };
  }

  return { error: null };
};

function saveChatToBuffer(documentId, message, context, role = 'human') {
  try {
    if (chatMemory.memoryKey !== documentId) {
      chatMemory.memoryKey = documentId;
    }

    const saveItem = {
      name: role,
      content: message,
      context
    };

    if (chatMemory.chatHistory) {
      chatMemory.chatHistory.addMessage(saveItem);
    } else {
      chatMemory.chatHistory = new ChatMessageHistory().addMessage(saveItem);
    }
  } catch (error) {
    console.error({ error });
  }
}
