'use client';

import { useEffect, useRef, useState } from 'react';

import { AlternateEmail, Key } from '@mui/icons-material';
import { Grid } from '@mui/material';

import Hero from './Hero';
import Loader from './Loader';
import LoginInputs from './LoginInputs';

export default function Login() {
  const isFirstRender = useRef(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputData = [
    {
      label: 'Email',
      type: 'email',
      value: email,
      onChange: (e) => setEmail(e.target.value),
      adornment: <AlternateEmail />
    },
    {
      label: 'Password',
      type: 'password',
      value: password,
      onChange: (e) => setPassword(e.target.value),
      adornment: <Key />
    }
  ];

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, []);

  return (
    <Grid
      container
      sx={{
        width: '100%',
        height: '100%'
      }}
    >
      {isFirstRender.current && <Loader />}
      {!isFirstRender.current && (
        <>
          <Grid
            item
            xl={4}
            lg={4}
            md={5}
            sm={12}
            xs={12}
            display={{
              xl: 'flex',
              lg: 'flex',
              md: 'flex',
              sm: 'none',
              xs: 'none'
            }}
          >
            <Hero />
          </Grid>
          <Grid item xl={8} lg={8} md={7} sm={12} xs={12}>
            <LoginInputs
              inputData={inputData}
              credentials={{
                email,
                password
              }}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
