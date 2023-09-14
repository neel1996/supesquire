import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

export default function CodeBlock({ message }) {
  return (
    <div
      style={{
        userSelect: 'text'
      }}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, ...props }) {
            if (message && message.indexOf('```') === -1) {
              return message.split('\n').map((m, idx) => {
                return (
                  <div key={m + idx}>
                    <div>{m}</div>
                    {idx !== message.split('\n').length - 1 && <br />}
                  </div>
                );
              });
            }

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
