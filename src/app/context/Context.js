'use client';

import { createContext } from 'react';

export const ChatContext = createContext({
  activeChatId: null,
  socket: null,
  conversationHistory: null,
  currentDocument: null,
  supabase: null,
  isLoggedIn: false,
  setActiveChatId: null,
  setSocket: null,
  setConversationHistory: null,
  setCurrentDocument: null,
  setIsLoggedIn: null,
  login: null
});
