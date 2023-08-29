'use client';

import { useRouter } from 'next/navigation';

import { Chat } from '@mui/icons-material';
import { Fab } from '@mui/material';

import Search from './search/Search';
import withAuth from './withAuth';

function App() {
  const route = useRouter();

  return (
    <>
      <Search />
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
        onClick={() => {
          route.push('/chat');
        }}
      >
        <Chat
          sx={{
            fontSize: '38px'
          }}
        />
      </Fab>
    </>
  );
}

export default withAuth(App);
