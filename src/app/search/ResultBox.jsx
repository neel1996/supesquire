import React from 'react';

import { PushPin } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';

export default function ResultBox({ answer }) {
  return (
    <Box
      sx={{
        margin: '0px 0px 30px 0px',
        padding: '10px',
        background: '#4b4f6b',
        color: '#c8cce7',
        borderRadius: '10px',
        boxShadow: '5px 5px rgba(0,0,0,0.6)'
      }}
    >
      <Grid
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <PushPin />
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: '600'
          }}
        >
          Result
        </Typography>
      </Grid>
      <Box padding="20px">
        <Typography
          variant="body1"
          sx={{
            fontSize: {
              md: '16px',
              xs: '12px'
            }
          }}
        >
          {answer}
        </Typography>
      </Box>
    </Box>
  );
}
