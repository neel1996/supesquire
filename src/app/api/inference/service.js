import { sequentialPipeline } from '../langchain/pipeline';
import { filterSimilarVectors } from './vectorSearch';

export const infer = async ({ documentId, question, matchCount = 10 }) => {
  const { content, error } = await filterSimilarVectors(
    documentId,
    question,
    matchCount
  );

  if (error) {
    console.error({ error });
    return {
      error
    };
  }

  try {
    return await sequentialPipeline({ content, question });
  } catch (error) {
    console.error({ error });
    return {
      error
    };
  }
};
