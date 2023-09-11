'use client';

import { useEffect, useState } from 'react';

import { useHttpClient } from '@/useHttpClient';

import { ChatContext } from './Context';

export default function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [conversationHistory, setConversationHistory] = useState(null);
  const [openDraw, setOpenDraw] = useState(false);

  const { fetch } = useHttpClient();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
