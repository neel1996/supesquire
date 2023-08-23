'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default function Reset() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const resetPassword = () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);

    supabase.auth
      .updateUser({
        password
      })
      .then(() => {
        setPassword('');
        setConfirmPassword('');
      });
  };

  return (
    <Container>
      <Box
        sx={{
          margin: '50px 10px'
        }}
      >
        <Typography variant="h3" color="#fff">
          Password reset
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%'
        }}
      >
        <Stack
          sx={{
            gap: '20px'
          }}
        >
          <TextField
            sx={{
              width: '400px'
            }}
            type="password"
            placeholder="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              backgroundColor: 'white'
            }}
          />
          <TextField
            sx={{
              width: '400px'
            }}
            type="password"
            placeholder="confirm password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              backgroundColor: 'white'
            }}
          />
          {passwordError && (
            <Typography
              sx={{
                color: 'red'
              }}
            >
              Passwords do not match
            </Typography>
          )}
          <Button
            color="primary"
            variant="contained"
            sx={{
              width: '300px',
              padding: '20px'
            }}
            onClick={() => {
              resetPassword();
            }}
          >
            Reset
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
