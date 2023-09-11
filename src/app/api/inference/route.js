import { ChatMessageHistory } from 'langchain/memory';
import { v4 as uuid } from 'uuid';

import { chatMemory } from '../openai';
import { saveChat } from './saveChat';
import { infer } from './service';

export const POST = async (req) => {
  const { documentId, conversationId, message } = await req.json();

  saveChatToBuffer(documentId, message, 'human');
  saveChat({
    id: conversationId,
    message,
    checksum: documentId,
    actor: 'human'
  }).catch((error) => {
    console.error({ error });
  });

  const stream = new TransformStream();
  const aiMessageId = uuid().toString();
  infer({ documentId, question: message, aiMessageId, stream });

  const res = new Response(await stream.readable);
  res.headers.set('Content-Type', 'text/event-stream');
  res.headers.set('ConversationId', aiMessageId);

  return res;
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
