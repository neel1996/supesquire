'use client';

import { createContext } from 'react';

export const ChatContext = createContext({
  activeChatId: null,
  socket: null
});
