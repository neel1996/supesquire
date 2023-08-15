import { Card, Container, Typography } from '@mui/material';
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
        <Card
          elevation={10}
          sx={{
            width: 'fit-content',
            padding: '20px',
            background: '#ecefff',
            borderRadius: '20px',
            margin: '0px auto'
          }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            draggable={false}
          />
        </Card>
      </Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#94a4ff'
        }}
      >
        chat with your document in real time
      </Typography>
      <Typography sx={{ color: '#cacaca', padding: '10px 0px' }}>
        powered by OpenAI and Supabase
      </Typography>
    </>
  );
}
