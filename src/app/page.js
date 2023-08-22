'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import ChatProvider from './context/Provider';

export default function App() {
  return (
    <ChatProvider>
      <ToastContainer theme="dark" />
      <Home />
    </ChatProvider>
  );
}
