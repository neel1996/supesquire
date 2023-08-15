'use client';

import Home from './components/Home';
import ChatProvider from './context/Provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <ChatProvider>
      <ToastContainer theme="dark" />
      <Home />
    </ChatProvider>
  );
}
