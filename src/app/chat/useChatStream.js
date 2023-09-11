import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

export const useChatStream = () => {
  const submitHandler = async ({ documentId, message, setConversations }) => {
    if (message?.length === 0) {
      return;
    }

    const conversationId = uuid().toString();
    setConversations((prev) => {
      return [
        ...prev,
        {
          user: 'human',
          id: conversationId,
          message,
          created_at: new Date().toString()
        },
        {
          user: 'ai',
          loader: true
        }
      ];
    });

    const res = await fetch('/api/inference', {
      method: 'POST',
      body: JSON.stringify({
        message,
        documentId,
        conversationId
      })
    });

    if (!res.ok) {
      return handleError(res, setConversations);
    }

    const aiMessageId = res.headers.get('ConversationId');
    const timestamp = new Date().toString();
    const reader = res.body.getReader();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      const message = new TextDecoder('utf-8').decode(value);
      if (message) {
        setConversations((prev) => {
          let idx = prev.findIndex((item) => item.id === aiMessageId);

          if (idx === -1) {
            const temp = prev;
            prev.pop();

            return [
              ...temp,
              {
                id: aiMessageId,
                user: 'ai',
                message,
                created_at: timestamp
              }
            ];
          }

          prev.splice(idx, 1, {
            id: aiMessageId,
            user: 'ai',
            message: prev[idx].message + message,
            created_at: timestamp
          });

          return [...prev];
        });
      }
    }
  };

  const handleError = async (error, setConversations) => {
    console.error({ error });

    setConversations((prev) => {
      let temp = [...prev];
      const popped = temp.pop();
      if (popped.loader) {
        return temp;
      }

      return prev;
    });

    toast.error('Cannot get the answer. Please try again later.', {
      toastId: 'chat_error',
      position: 'bottom-left'
    });
  };

  return {
    submitHandler
  };
};
