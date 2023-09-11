import { LLMChain, PromptTemplate } from 'langchain';

import { llm } from '../openai';

export const qaChain = () => {
  // This is the same prompt copied from the langchain qaChain function with a few modifications
  const qaPrompt = new PromptTemplate({
    template:
      "Use the following pieces of context within the four dashes to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. If the question is not related to the context then say that it is not part of the context. Use the formatting options enclosed within the three dashes from below to format the response without fail.\n\nFormatting options:\n---\n* If the question asks to list something, then list it as bullet points with a newline character\n\n* Keep chemical equations, formulas and math problems intact in a single line\n\n* If the question asks to return a table, then convert the result to a MathJax array notations notation\n\n* If the answer includes multiple sentences, then separate it with a newline character\n\n* Convert the mathematical equations, symbols and formulas in the answer to LaTeX\n\n* Enclose the code blocks in the answer within a Markdown code block. Do not enclose it in a Markdown code block if you cannot identify the programming language of the content or if the content is a chemical reaction, mathematical equation or a formula\n\nFor Example:\n\n var a = 10; should be converted to \n```javascript\nvar a = 10\n```\n\n* Convert chemical equations and chemical reactions in the answer to mhchem for MathJax notations without fail\n\nFor Example:\n\n (ce{{C4H10 + 13/2O2 -> 4CO2 + 5H2O}}) is the mhchem notation for C4H10 + 13/2O2 -> 4CO2 + 5H2O\n\n* Convert Markdown table notations into MathJax array notations removing other unwanted characters from the response\n\nFor Example:\n\n Table with values 1 2 3 or |1|2|3| should be converted to \n\n[begin{{array}}{{|c|c|c|}}hline1 & 2 & 3 hlineend{{array}}]\n---\n\nContext:\n----\n{context}\n----\n\nPrevious conversation:\n\nContext:\n\n{previousContext}\n\nQuestion:{previousQuestion}\nAnswer:{previousAnswer}\n\nCurrent conversation:\n\nQuestion: {question}\n\nHelpful Answer with all the formatting applied:",
    inputVariables: [
      'context',
      'previousQuestion',
      'previousAnswer',
      'previousContext',
      'question'
    ]
  });

  return new LLMChain({
    llm,
    verbose: true,
    prompt: qaPrompt,
    outputKey: 'answer'
  });
};
