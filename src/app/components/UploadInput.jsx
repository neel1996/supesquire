import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function UploadInput({ getInputProps }) {
  return (
    <>
      <input {...getInputProps()} />
      <Container
        sx={{
          padding: '10px',
          userSelect: 'none'
        }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          draggable={false}
        />
      </Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#3f51b5'
        }}
      >
        chat with your document in real time
      </Typography>
      <Typography sx={{ color: '#7f7f7f', padding: '10px 0px' }}>
        powered by OpenAI and Supabase
      </Typography>
    </>
  );
}
