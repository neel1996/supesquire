import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(config);

export const embeddings = async (content) => {
  const input = content.replace(/\n/g, ' ');

  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input
  });

  const [{ embedding }] = embeddingResponse.data.data;

  return embedding;
};
