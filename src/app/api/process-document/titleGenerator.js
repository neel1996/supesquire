import { LLMChain, PromptTemplate } from 'langchain';

import { llm } from '../openai';

const { supabase } = require('../supabase');

export const generateDocumentTitle = async (checksum, fileName) => {
  const defaultTitle = {
    title: fileName
  };
  const prompt = new PromptTemplate({
    template:
      'Based on the passage below, suggest a modest title for the passage. The following are the conditions that must be followed\n\n- The title should be within ten words\n- The title should include only alphabets and numbers\n\nPassage:\n------------------\n{content}\n------------------\n\nTitle:',
    inputVariables: ['content']
  });

  const { content } = await getChunkContent(checksum, 3);
  if (content === null) {
    return defaultTitle;
  }

  const chain = new LLMChain({
    llm,
    prompt,
    verbose: true
  });

  const { text: title, error } = await chain
    .call({
      content
    })
    .catch((error) => {
      console.error({ error });
      return { error };
    });

  if (error) {
    return defaultTitle;
  }

  const { error: updateError } = await supabase()
    .from('documents')
    .update({
      title
    })
    .eq('checksum', checksum);

  if (updateError) {
    console.error(updateError);
    return defaultTitle;
  }

  return {
    title
  };
};

const getChunkContent = async (checksum, chunkLimit = 3) => {
  const { data, error } = await supabase()
    .from(process.env.NEXT_PUBLIC_SUPABASE_DOCUMENTS_CHUNK_TABLE)
    .select('chunk_content')
    .lte('chunk_number', chunkLimit)
    .eq('document_checksum', checksum);

  if (error) {
    console.error(error);
    return {
      content: null
    };
  }

  const content = data
    .map((chunk) => chunk.chunk_content)
    .join('\n')
    .slice(0, 6000);

  return {
    content
  };
};
