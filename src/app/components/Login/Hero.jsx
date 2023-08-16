import { Card, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function Hero() {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <Card
        elevation={10}
        sx={{
          padding: '10px',
          borderRadius: '10px',
          background: '#d9deff'
        }}
      >
        <Image src={'/logo.png'} width={120} height={120} alt="logo" />
      </Card>
      <Stack
        sx={{
          textAlign: 'center',
          margin: '10px 0px'
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#94a4ff'
          }}
        >
          chat with your document in real time
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: '#cacaca', padding: '10px 0px' }}
        >
          powered by OpenAI and Supabase
        </Typography>
      </Stack>
    </Stack>
  );
}
