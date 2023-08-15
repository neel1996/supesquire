'use client';

import { Grid } from '@mui/material';
import History from './History';
import Hero from './Hero';
import { useContext, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { ChatContext } from '../context/Context';
import ChatContainer from './ChatElements/ChatContainer';

export default function Home() {
  const { activeChatId, setSocket } = useContext(ChatContext);

  const socketInitializer = useCallback(async () => {
    await axios.post('/api/socket');

    setSocket((prev) => {
      if (prev) return;

      const socket = io(window.location.origin, {
        path: '/api/socket_io',
        addTrailingSlash: false
      });

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      return socket;
    });
  }, [setSocket]);

  useEffect(() => {
    socketInitializer();
  }, [socketInitializer]);

  return (
    <Grid container xs={12}>
      <Grid item xs={3}>
        <History />
      </Grid>
      <Grid item xs={9}>
        {activeChatId ? <ChatContainer /> : <Hero />}
      </Grid>
    </Grid>
  );
}
