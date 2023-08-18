import TypeWriter from 'typewriter-effect';

export default function TypingText({ setConversations, message }) {
  return (
    <TypeWriter
      options={{
        delay: 1,
        cursor: ''
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString(message)
          .changeDelay(1)
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
