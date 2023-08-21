'use client';

import { useEffect, useState } from 'react';
import { ChatContext } from './Context';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-toastify';

export default function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [conversationHistory, setConversationHistory] = useState(null);
  const [openDraw, setOpenDraw] = useState(false);

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY
  });

  const login = async ({ email, password }) => {
    setIsLoggedIn(false);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    await fetch('/api/auth/login', {
      method: 'POST',
      body: formData
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login failed');
        }
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error({ error });
        toast.error('Login failed', {
          position: 'bottom-right'
        });
        setIsLoggedIn(false);
      });
  };

  useEffect(() => {
    const validate = async () => {
      await supabase.auth
        .getUser()
        .then((user) => {
          if (user.error) {
            setIsLoggedIn(false);
            return;
          } else {
            setIsLoggedIn(true);
          }
        })
        .catch((error) => {
          console.error({ error });
          setIsLoggedIn(false);
        });
    };

    validate();
  }, [supabase]);

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
  }, [activeChatId, isLoggedIn]);

  return (
    <ChatContext.Provider
      value={{
        activeChatId,
        setActiveChatId,
        conversationHistory,
        setConversationHistory,
        currentDocument,
        setCurrentDocument,
        supabase,
        isLoggedIn,
        setIsLoggedIn,
        login,
        openDraw,
        setOpenDraw
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
