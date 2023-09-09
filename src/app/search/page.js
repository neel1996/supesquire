'use client';

import Link from 'next/link';

import { Chat } from '@mui/icons-material';
import { Fab } from '@mui/material';

import withAuth from '../withAuth';
import Search from './Search';

function App() {
  return (
    <>
      <Search />
      <Link href="/chat">
        <Fab
          color="default"
          size="large"
          sx={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '70px',
            height: '70px',
            background: '#7793f6',
            color: '#404251',
            '&:hover': {
              background: '#868fb2'
            }
          }}
        >
          <Chat
            sx={{
              fontSize: '38px'
            }}
          />
        </Fab>
      </Link>
    </>
  );
}

export default withAuth(App);
