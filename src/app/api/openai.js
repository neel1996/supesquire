import { OpenAI } from 'langchain/llms/openai';

export const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY
});
