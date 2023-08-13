'use client';

import { useState } from 'react';
import { ChatContext } from './Context';

export default function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const [socket, setSocket] = useState(null);

  return (
    <ChatContext.Provider
      value={{ activeChatId, setActiveChatId, socket, setSocket }}
    >
      {children}
    </ChatContext.Provider>
  );
}
