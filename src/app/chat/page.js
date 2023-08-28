'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import withAuth from '../withAuth';
import Home from './components/Home';
import ChatProvider from './context/Provider';

function App() {
  return (
    <ChatProvider>
      <ToastContainer theme="dark" />
      <Home />
    </ChatProvider>
  );
}

export default withAuth(App);
