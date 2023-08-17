import { OpenAI } from 'langchain/llms/openai';

export const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo'
});
