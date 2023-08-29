import { SequentialChain } from 'langchain/chains';

import { formatChain, qaChain } from './chains';

export const sequentialPipeline = async ({ content, question }) => {
  const pipeline = new SequentialChain({
    chains: [qaChain(), formatChain()],
    inputVariables: ['context', 'question'],
    outputVariables: ['answer', 'text'],
    verbose: true
  });

  const { text, aiError } = await pipeline
    .call({
      context: content.slice(0, 6000),
      question
    })
    .catch((error) => {
      console.error({ error });
      return { aiError: error };
    });

  return { answer: text, error: aiError };
};
