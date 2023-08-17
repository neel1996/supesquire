import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import LogoCard from '../LogoCard';

export default function MobileHeader() {
  return (
    <Grid
      sx={{
        display: {
          xl: 'none',
          lg: 'none',
          md: 'none',
          sm: 'flex',
          xs: 'flex'
        },
        margin: '40px auto',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Grid item>
        <LogoCard />
      </Grid>
      <Grid item>
        <Stack marginLeft="10px">
          <Typography variant="h6" color="#4696ab">
            Login to chat with your docs
          </Typography>
          <Typography variant="caption" color="#677183">
            powered by supabase & OpenAI
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
