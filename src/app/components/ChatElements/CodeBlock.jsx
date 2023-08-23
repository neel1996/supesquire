import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ message }) {
  if (message?.indexOf('```') === -1) {
    return message.split('\n').map((m, idx) => {
      return <div key={m + idx}>{m}</div>;
    });
  }

  return (
    <div
      style={{
        userSelect: 'text'
      }}
    >
      <Markdown
        components={{
          code({ inline, ...props }) {
            const match = /language-(\w+)/.exec(props.className || '');

            return !inline && match ? (
              <SyntaxHighlighter
                style={{
                  ...atomDark,
                  userSelect: 'all'
                }}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(props.children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props} className="language-javascript">
                {props.children}
              </code>
            );
          }
        }}
      >
        {message}
      </Markdown>
    </div>
  );
}
