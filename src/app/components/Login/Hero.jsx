import React from 'react';

import { Stack, Typography } from '@mui/material';

import LogoCard from '../LogoCard';

export default function Hero() {
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0px auto'
      }}
      spacing={2}
    >
      <LogoCard />
      <Stack
        sx={{
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#94a4ff'
          }}
          fontSize={{
            xl: '1.6rem',
            lg: '1.5rem',
            md: '1.3rem',
            sm: '1.2rem',
            xs: '1rem'
          }}
        >
          chat with your document in real time
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: '#cacaca', padding: '10px 0px' }}
          fontSize={{
            xl: '1rem',
            lg: '0.8rem',
            md: '0.8rem',
            sm: '0.6rem',
            xs: '0.5rem'
          }}
        >
          powered by OpenAI and Supabase
        </Typography>
      </Stack>
    </Stack>
  );
}
