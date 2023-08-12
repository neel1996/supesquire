import { Stack, Typography, Grid } from '@mui/material';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Stack alignItems="center">
      <ThreeDots color="#6872a9" height="120" />
      <Typography
        variant="caption"
        color="#818ab5"
        sx={{
          textAlign: 'left'
        }}
      >
        Processing uploaded document
      </Typography>
    </Stack>
  );
}
