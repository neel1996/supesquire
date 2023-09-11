import { PromptTemplate } from 'langchain';
import { LLMChain } from 'langchain/chains';

import { formatChain, qaChain } from '../langchain/chains';
import { sequentialPipeline } from '../langchain/pipeline';
import { llm, openAIEmbedding } from '../openai';
import { supabase } from '../supabase';

export const search = async (query) => {
  const { closestMatch, error } = await findClosestVector(query);
  if (error) {
    console.error(error);
    return { error };
  }

  const prompt = new PromptTemplate({
    template:
      'The below is a chunk of words picked from a whole document. The words are not in proper order and it is not legible. Convert the chunk into a meaningful way so that it makes proper sense while reading. Use only the provided content from below. Do not include any additional information that are not available in the original content. If the content cannot be made sense of, then just say <Cannot fetch content>\n\nRandom chunk:\n-------------------\n\n{rawContent}\n\nFixed result that makes sense:',
    inputVariables: ['rawContent']
  });

  const paraphraseChain = new LLMChain({
    llm,
    verbose: true,
    prompt
  });

  const { text: content } = await paraphraseChain.call({
    rawContent: closestMatch.chunk_content.slice(0, 6000)
  });

  const { answer, error: chainError } = await sequentialPipeline({
    content,
    question: query,
    chains: [qaChain(), formatChain()],
    callbacks: []
  });

  return {
    data: {
      document: closestMatch.document_name,
      content,
      answer
    },
    error: chainError
  };
};

const findClosestVector = async (query) => {
  const { data, error } = await supabase().rpc('search_documents', {
    query_embedding: await openAIEmbedding.embedQuery(query),
    match_count: 5
  });

  if (error) {
    console.error(error);
    return { error };
  }

  const combinedContent = data.map((d) => d.chunk_content).join(' ');

  return {
    closestMatch: {
      document_name: data[0].document_name,
      chunk_content: combinedContent
    },
    error: null
  };
};
