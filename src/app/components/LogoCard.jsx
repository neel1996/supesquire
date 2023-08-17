import { Box, Card } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function LogoCard() {
  return (
    <Card
      elevation={10}
      sx={{
        padding: '10px',
        borderRadius: '10px',
        background: '#d9deff'
      }}
    >
      <Box
        sx={{
          position: 'relative'
        }}
        width={{
          xl: '150px',
          lg: '150px',
          md: '150px',
          sm: '100px',
          xs: '80px'
        }}
        height={{
          xl: '150px',
          lg: '150px',
          md: '150px',
          sm: '100px',
          xs: '80px'
        }}
      >
        <Image
          src={'/logo.png'}
          layout="fill"
          objectFit="cover"
          alt="logo"
          draggable={false}
        />
      </Box>
    </Card>
  );
}
