import { createClient } from '@supabase/supabase-js';
import { Inter } from 'next/font/google';
import { OpenAI } from 'langchain/llms/openai';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Just a doc QA bot!',
  description: 'App to chat with docs'
};

const apiURL = process.env.SUPABASE_URL;
const apiKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(apiURL, apiKey);
globalThis.supabase = supabase;

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY
});
globalThis.llm = llm;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
