'use client';

import { createContext } from 'react';

export const ChatContext = createContext({
  activeChatId: null,
  conversationHistory: null,
  currentDocument: null,
  supabase: null,
  isLoggedIn: false,
  setActiveChatId: null,
  setConversationHistory: null,
  setCurrentDocument: null,
  setIsLoggedIn: null,
  login: null,
  openDraw: false,
  setOpenDraw: null
});
