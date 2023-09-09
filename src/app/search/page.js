'use client';

import { useRouter } from 'next/navigation';

import { Chat, LogoutRounded, MenuOpenRounded } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction } from '@mui/material';

import { supabaseClient } from '../supabaseClient';
import withAuth from '../withAuth';
import Search from './Search';

function App() {
  const router = useRouter();

  const actions = [
    {
      icon: <Chat />,
      name: 'Chat',
      onclick: () => {
        router.push('/chat');
      }
    },
    {
      icon: <LogoutRounded />,
      name: 'Logout',
      onclick: () => {
        supabaseClient.auth.signOut().then(() => {
          router.push('/login');
        });
      }
    }
  ];

  return (
    <>
      <Search />
      <SpeedDial
        sx={{
          position: 'fixed',
          bottom: '40px',
          right: '40px',
          '.MuiSpeedDial-fab': {
            background: '#7793f6',
            '&:hover': {
              background: '#ffffff'
            }
          }
        }}
        direction="up"
        ariaLabel="SpeedDial menu"
        icon={
          <MenuOpenRounded
            sx={{
              width: '40px',
              height: '40px',
              color: '#404251'
            }}
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onclick}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default withAuth(App);
