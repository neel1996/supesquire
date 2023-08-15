'use client';

import { useEffect, useState } from 'react';
import { ChatContext } from './Context';
import { createClient } from '@supabase/supabase-js';

export default function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [socket, setSocket] = useState(null);
  const [conversationHistory, setConversationHistory] = useState(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_API_KEY
  );

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
        socket,
        setSocket,
        conversationHistory,
        setConversationHistory,
        currentDocument,
        setCurrentDocument,
        supabase
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
