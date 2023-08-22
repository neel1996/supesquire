import React, { useContext } from 'react';

import { ChatContext } from '@/app/context/Context';
import { Box, Button, InputAdornment, Stack, TextField } from '@mui/material';

import MobileHeader from './MobileHeader';

export default function LoginInputs({ inputData, credentials }) {
  const { login } = useContext(ChatContext);

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
        backgroundColor: '#e0e0e0',
        backgroundImage: 'url(background.png)'
      }}
    >
      <MobileHeader />
      <Box
        width={{
          xl: '50%',
          lg: '50%',
          md: '70%',
          sm: '70%',
          xs: '90%'
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
          onSubmit={(e) => {
            e.preventDefault();
            login({
              email: credentials?.email,
              password: credentials?.password
            });
          }}
        >
          {inputData.map((data, index) => (
            <TextField
              key={index}
              placeholder={data.label}
              type={data.type}
              value={data.value}
              onChange={data.onChange}
              variant="outlined"
              color="primary"
              focused
              sx={{
                margin: '10px 0px',
                background: '#ebf0ff',
                borderRadius: '10px',
                boxShadow: '0px 0px 4px 0px rgb(2 136 209 / 38%)'
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {data.adornment}
                  </InputAdornment>
                )
              }}
            />
          ))}
          <Button
            variant="contained"
            color="info"
            sx={{
              margin: '10px 0px',
              padding: '10px 0px',
              borderRadius: '10px'
            }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
