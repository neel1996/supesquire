'use client';

import Home from './components/Home';
import ChatProvider from './context/Provider';

export default function App() {
  return (
    <ChatProvider>
      <Home />
    </ChatProvider>
  );
}
