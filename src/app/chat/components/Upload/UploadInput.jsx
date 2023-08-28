import React from 'react';

import LogoCard from '@/app/LogoCard';
import { Typography } from '@mui/material';

export default function UploadInput({ getInputProps }) {
  return (
    <>
      <input {...getInputProps()} />
      <LogoCard />
      <Typography
        sx={{
          fontWeight: 'bold',
          color: '#94a4ff',
          fontSize: {
            xl: '30px',
            lg: '24px',
            md: '20px',
            sm: '20px',
            xs: '20px'
          }
        }}
      >
        chat with your document in real time
      </Typography>
      <Typography
        sx={{
          color: '#cacaca',
          padding: '10px 0px',
          fontSize: {
            xl: '20px',
            lg: '16px',
            md: '14px',
            sm: '14px',
            xs: '14px'
          }
        }}
      >
        powered by OpenAI and Supabase
      </Typography>
    </>
  );
}
