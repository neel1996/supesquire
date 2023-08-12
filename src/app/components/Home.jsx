'use client';

import { Grid } from '@mui/material';
import History from './History';
import Hero from './Hero';
import { useContext } from 'react';
import { ChatContext } from '../context/Context';
import ChatContainer from './ChatElements/ChatContainer';

export default function Home() {
  const { activeChatId } = useContext(ChatContext);

  return (
    <Grid container xs={12}>
      <Grid xs>
        <History />
      </Grid>
      <Grid xs={9}>{activeChatId ? <ChatContainer /> : <Hero />}</Grid>
    </Grid>
  );
}
