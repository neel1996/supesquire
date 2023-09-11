import { formatChain, qaChain } from '../langchain/chains';
import { sequentialPipeline } from '../langchain/pipeline';
import { saveChat } from './saveChat';
import { filterSimilarVectors } from './vectorSearch';

export const infer = async ({
  documentId,
  question,
  matchCount = 10,
  stream,
  aiMessageId
}) => {
  const writer = stream.writable.getWriter();

  const { content, error } = await filterSimilarVectors(
    documentId,
    question,
    matchCount
  );

  if (error) {
    console.error({ error });
    await writer.close();

    throw error;
  }

  try {
    const chains = [qaChain(), formatChain()];
    let chainSequence = chains.length;
    let aiMessage = '';
    const id = aiMessageId;

    const callbacks = [
      {
        async handleLLMNewToken(token) {
          if (chainSequence === 1) {
            await writer.ready;
            await writer.write(token);
            aiMessage += token;
          }
        },
        async handleChainEnd() {
          if (chainSequence === 1) {
            await writer.close();
            saveChat({
              id,
              message: aiMessage,
              checksum: documentId,
              actor: 'ai'
            }).catch((error) => {
              console.error({ error });
            });
          }
          chainSequence -= 1;
        }
      }
    ];

    return sequentialPipeline({ content, question, chains, callbacks }).catch(
      async (err) => {
        console.error({ err });
        await writer.close();
        throw err;
      }
    );
  } catch (error) {
    console.error({ error });
    return {
      error
    };
  }
};
