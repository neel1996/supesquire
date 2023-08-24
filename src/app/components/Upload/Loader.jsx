import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import { Stack, Typography } from '@mui/material';

export default function Loader({ status }) {
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
        {status}
      </Typography>
    </Stack>
  );
}
