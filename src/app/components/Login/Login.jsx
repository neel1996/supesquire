'use client';

import { ChatContext } from '@/app/context/Context';
import { AlternateEmail, Key } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import LoginInputs from './LoginInputs';
import Hero from './Hero';
import Loader from './Loader';

export default function Login() {
  const isFirstRender = useRef(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(ChatContext);

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

    if (email && password) {
      login({
        email,
        password
      });
    }
  }, [email, login, password]);

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
          <Hero />
          <LoginInputs
            inputData={inputData}
            credentials={{
              email,
              password
            }}
          />
        </>
      )}
    </Grid>
  );
}
