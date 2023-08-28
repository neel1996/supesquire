'use client';

import { useEffect, useState } from 'react';

import { ChatContext } from './Context';

export default function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [conversationHistory, setConversationHistory] = useState(null);
  const [openDraw, setOpenDraw] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      const response = await fetch('/api/history', {
        next: {
          revalidate: '60'
        }
      });
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
        conversationHistory,
        setConversationHistory,
        currentDocument,
        setCurrentDocument,
        openDraw,
        setOpenDraw
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
