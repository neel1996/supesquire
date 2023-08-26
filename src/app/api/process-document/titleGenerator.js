const { infer } = require('../inference/service');
const { supabase } = require('../supabase');

export const generateDocumentTitle = async (checksum) => {
  const question =
    'What is the title of this document?\nRespond only the title and nothing else\nDo not include any quotations or a prefix in the title\nThe title should not be more than 10 words long';

  const { answer, error } = await infer({
    documentId: checksum,
    question,
    matchCount: 5
  });
  if (error) {
    console.error(error);
    return {
      title: null
    };
  }

  const { error: updateError } = await supabase()
    .from('documents')
    .update({
      title: answer
    })
    .eq('checksum', checksum);

  if (updateError) {
    console.error(updateError);
    return {
      title: null
    };
  }

  return {
    title: answer
  };
};
