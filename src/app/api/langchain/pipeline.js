import { SequentialChain } from 'langchain/chains';

import { chatMemory } from '../openai';
import { formatChain, qaChain } from './chains';

export const sequentialPipeline = async ({ content, question }) => {
  const promptInputs = {
    context: content.slice(0, 6000),
    question
  };

  const messages = await chatMemory.chatHistory.getMessages();
  if (messages.length > 1) {
    const aiMessage = messages.slice(-1)[0];
    const humanMessage = messages.slice(-2)[0];
    promptInputs.previousQuestion = humanMessage.content;
    promptInputs.previousAnswer = aiMessage.content;
    promptInputs.previousContext = aiMessage.context;
  } else {
    promptInputs.previousQuestion = '';
    promptInputs.previousAnswer = '';
    promptInputs.previousContext = '';
  }

  const pipeline = new SequentialChain({
    chains: [qaChain(), formatChain()],
    inputVariables: [
      'context',
      'question',
      'previousQuestion',
      'previousAnswer',
      'previousContext'
    ],
    outputVariables: ['answer', 'text']
  });

  const { text, aiError } = await pipeline.call(promptInputs).catch((error) => {
    console.error({ error });
    return { aiError: error };
  });

  return { answer: text, context: content.slice(0, 6000), error: aiError };
};
