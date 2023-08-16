import { Stack, Typography } from '@mui/material';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Stack alignItems="center">
      <ThreeDots color="#a4abce" height="120" />
      <Typography
        variant="caption"
        color="#a4abce"
        sx={{
          textAlign: 'left'
        }}
      >
        Processing uploaded document
      </Typography>
    </Stack>
  );
}
