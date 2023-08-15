'use client';

import { useEffect, useState } from 'react';
import { ChatContext } from './Context';

export default function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [socket, setSocket] = useState(null);
  const [conversationHistory, setConversationHistory] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      const response = await fetch('/api/history');
      const data = await response.json();

      setConversationHistory(data);
    };

    loadHistory();
  }, [activeChatId]);

  return (
    <ChatContext.Provider
      value={{
        activeChatId,
        setActiveChatId,
        socket,
        setSocket,
        conversationHistory,
        setConversationHistory
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
