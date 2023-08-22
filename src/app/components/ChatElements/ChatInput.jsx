import React from 'react';

import { KeyboardArrowRight, Send } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

export default function ChatInput({ userMessage, setUserMessage }) {
  return (
    <Grid
      container
      sx={{
        width: {
          xl: '70%',
          md: '70%',
          xs: '90%'
        },
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#313338',
        borderRadius: '10px',
        boxShadow: '1px 3px 9px 6px rgb(44, 46, 57, 0.62)',
        height: '100%'
      }}
    >
      <Grid
        xl={11}
        sm={11}
        xs={10}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <TextField
          fullWidth
          value={userMessage}
          variant="outlined"
          placeholder="Type your message here..."
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          sx={{
            borderRadius: '10px 0px 0px 10px',
            border: 'none'
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyboardArrowRight
                  sx={{
                    fontSize: '40px',
                    color: '#86878a',
                    padding: '0px'
                  }}
                />
              </InputAdornment>
            ),
            style: {
              color: '#ffffff'
            }
          }}
        />
      </Grid>
      <Grid
        xl={1}
        sm={1}
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: '#1f1f1f',
          borderRadius: '0px 10px 10px 0px'
        }}
      >
        <IconButton
          type="submit"
          sx={{
            height: '100%'
          }}
        >
          <Send
            sx={{
              color: '#ffffff'
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}
