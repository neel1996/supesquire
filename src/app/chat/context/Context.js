'use client';

import { createContext } from 'react';

export const ChatContext = createContext({
  activeChatId: null,
  conversationHistory: null,
  currentDocument: null,
  setActiveChatId: null,
  setConversationHistory: null,
  setCurrentDocument: null,
  login: null,
  openDraw: false,
  setOpenDraw: null
});
