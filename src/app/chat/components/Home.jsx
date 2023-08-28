'use client';

import { useContext } from 'react';

import { Box, Grid } from '@mui/material';

import { ChatContext } from '../context/Context';
import ChatContainer from './ChatElements/ChatContainer';
import History from './ChatHistory/History';
import MobileHistoryView from './ChatHistory/MobileHistoryView';
import Hero from './Upload/Hero';

export default function Home() {
  const { activeChatId } = useContext(ChatContext);

  return (
    <Grid container>
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
  );
}
