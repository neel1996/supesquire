import { LLMChain, PromptTemplate } from 'langchain';

import { llm } from '../openai';

export const qaChain = () => {
  // This is the same prompt copied from the langchain qaChain function with a few modifications
  const qaPrompt = new PromptTemplate({
    template:
      "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer. If the question asks to list something, then list it as bullet points with a newline character. If the question asks to return a table, then convert the result to a MathJax array notations notation.\n\n{context}\n\nPrevious conversation:\n\nContext:\n\n{previousContext}\n\nQuestion:{previousQuestion}\nAnswer:{previousAnswer}\n\nCurrent conversation:\n\nQuestion: {question}\n\nHelpful Answer:",
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

// Formats the answer to be displayed in the chat window
// This will be parsed in the UI to enable syntax highlighting for code blocks
// and to render LaTeX equations
export const formatChain = () => {
  const formatPrompt = new PromptTemplate({
    template:
      'Use the following content and perform the formatting options listed below. Perform the formatting only if applicable. If the formatting cannot be applied, then simply return the same content back as the response\n\n* If the content includes multiple sentences, then separate it with a newline character\n* Convert the mathematical equations, symbols and formulas to LaTeX\n* Convert chemical equations and chemical reactions to mhchem for MathJax notations\n\nFor Example:\n\n \\(\\ce{{C4H10 + 13/2O2 -> 4CO2 + 5H2O}}\\) is the mhchem notation for C4H10 + 13/2O2 -> 4CO2 + 5H2O\n\n* Enclose the code blocks in the response within a Markdown code block. Do not enclose it in a Markdown code block if you cannot identify the programming language of the content\n\nFor Example:\n\n var a = 10; should be converted to \n```javascript\nvar a = 10\n```\n\n* Convert Markdown table notations into MathJax array notations removing other unwanted characters from the response\n\nFor Example:\n\n Table with values 1 2 3 or |1|2|3| should be converted to \n\n\\[\\begin{{array}}{{|c|c|c|}}\\hline1 & 2 & 3 \\\\hline\\end{{array}}\\]\n\nContent to be formatted:\n\n{answer}\n\nFormatted Content:',
    inputVariables: ['answer']
  });

  return new LLMChain({
    llm,
    prompt: formatPrompt,
    outputKey: 'text'
  });
};
