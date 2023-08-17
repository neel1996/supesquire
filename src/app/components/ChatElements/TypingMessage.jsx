import TypeWriter from 'typewriter-effect';

export default function TypingText({ setConversations, message }) {
  return (
    <TypeWriter
      options={{
        delay: 20,
        cursor: ''
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(message)
          .callFunction(() => {
            setConversations((prev) => {
              return [
                ...prev.slice(0, prev.length - 1),
                {
                  user: 'ai',
                  message
                }
              ];
            });
          })
          .start();
      }}
    />
  );
}
