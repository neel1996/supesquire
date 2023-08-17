'use client';

import { Box, Grid } from '@mui/material';
import History from './History';
import Hero from './Hero';
import { useContext, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { ChatContext } from '../context/Context';
import ChatContainer from './ChatElements/ChatContainer';
import Login from './Login/Login';
import MobileHistoryView from './MobileHistoryView';

export default function Home() {
  const { activeChatId, setSocket, isLoggedIn } = useContext(ChatContext);

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
    <>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <Grid container xs={12}>
          <Grid item xl={3} lg={3} md={4}>
            <Box
              display={{
                xl: 'block',
                lg: 'block',
                md: 'none',
                sm: 'none',
                xs: 'none'
              }}
            >
              <History />
            </Box>
            <MobileHistoryView />
          </Grid>
          <Grid
            item
            xl={9}
            lg={9}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              height: '100vh'
            }}
          >
            {activeChatId ? <ChatContainer /> : <Hero />}
          </Grid>
        </Grid>
      )}
    </>
  );
}
