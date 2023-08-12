'use client';

import { useState } from 'react';
import { ChatContext } from './Context';

export default function ChatProvider({ children }) {
  const [activeChatId, setActiveChatId] = useState(null);

  return (
    <ChatContext.Provider value={{ activeChatId, setActiveChatId }}>
      {children}
    </ChatContext.Provider>
  );
}
