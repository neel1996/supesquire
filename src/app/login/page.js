'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';

import { supabaseClient } from '@/app/supabaseClient';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export default function App() {
  const router = useRouter();

  supabaseClient.auth.onAuthStateChange((event, session) => {
    if (session?.access_token) {
      router.push('/');
    }
  });

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          xl: 'calc(100% - 800px)',
          lg: '50%',
          md: '70%'
        },
        margin: 'auto',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          padding: '50px',
          borderRadius: '20px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
          background: '#1e1e1e'
        }}
      >
        <Stack rowGap={1} margin="0px 0px 40px 0px">
          <Typography variant="h4" color="#fff">
            [S]upesquire
          </Typography>
          <Typography variant="body2" color="#fff">
            chat with your docs
          </Typography>
        </Stack>
        <Auth
          supabaseClient={supabaseClient}
          redirectTo="http://localhost:3000/"
          appearance={{
            theme: ThemeSupa,
            style: {
              input: {
                padding: '18px',
                color: 'white',
                borderRadius: '10px'
              },
              button: {
                padding: '14px',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '20px',
                border: 'none',
                background: '#086bb1',
                margin: '10px 0px'
              },
              label: {
                fontWeight: '500'
              },
              loader: {
                width: '100%'
              }
            }
          }}
          theme="dark"
          providers={null}
        />
      </Box>
    </Container>
  );
}
