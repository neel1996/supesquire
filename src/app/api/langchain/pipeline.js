import { SequentialChain } from 'langchain/chains';

import { chatMemory } from '../openai';

export const sequentialPipeline = async ({
  content,
  question,
  chains,
  callbacks
}) => {
  const promptInputs = {
    context: content.slice(0, 6000),
    question,
    previousQuestion: 'None',
    previousAnswer: 'None',
    previousContext: 'None'
  };

  try {
    const messages = await chatMemory.chatHistory.getMessages();
    if (messages.length > 1) {
      const aiMessage = messages.slice(-1)[0];
      const humanMessage = messages.slice(-2)[0];
      promptInputs.previousQuestion = humanMessage.content;
      promptInputs.previousAnswer = aiMessage.content;
      promptInputs.previousContext = aiMessage.context;
    }
  } catch (e) {
    console.error(e);
  }

  const pipeline = new SequentialChain({
    chains,
    inputVariables: [
      'context',
      'question',
      'previousQuestion',
      'previousAnswer',
      'previousContext'
    ],
    outputVariables: ['answer', 'text']
  });

  const { text, aiError } = await pipeline
    .call(promptInputs, {
      callbacks
    })
    .catch((error) => {
      console.error({ error });
      return { aiError: error };
    });

  return { answer: text, context: content.slice(0, 6000), error: aiError };
};
