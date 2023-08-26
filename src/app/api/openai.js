import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAIApi } from 'openai';

export const llm = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
});

export const openAI = new OpenAIApi({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export const openAIEmbedding = new OpenAIEmbeddings({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  modelName: 'text-embedding-ada-002'
});
