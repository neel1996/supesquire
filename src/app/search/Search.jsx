import React from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import ChatInput from '../chat/components/ChatElements/ChatInput';

export default function Search() {
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Grid
        item
        xs
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          form: {
            width: '100%',
            height: '80px'
          }
        }}
      >
        <Stack
          rowGap={1}
          sx={{
            marginBottom: '30px',
            marginTop: '-70px',
            color: '#9396a8'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xl: '60px',
                lg: '50px',
                xs: '40px'
              },
              '::first-letter': {
                color: '#7793f6'
              }
            }}
          >
            [S]upesquire search
          </Typography>
          <Typography>Search based on what you have uploaded</Typography>
        </Stack>
        <ChatInput placeHolder={'What are you looking for?'} mode="search" />
      </Grid>
    </Grid>
  );
}
