import React from 'react';

import { Box, Typography } from '@mui/material';

export default function ContentBox({ heading, content }) {
  return (
    <Box
      sx={{
        marginBottom: '20px'
      }}
    >
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: '600'
        }}
      >
        {heading}
      </Typography>
      <Box padding="20px">
        <Typography variant="subtitle1">{content}</Typography>
      </Box>
    </Box>
  );
}
