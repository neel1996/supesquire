import { Send } from '@mui/icons-material';
import { Grid, IconButton, TextField } from '@mui/material';
import React from 'react';

export default function ChatInput({ userMessage, setUserMessage }) {
  return (
    <Grid
      container
      sx={{
        width: '70%',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px 5px rgb(63,81,181,0.17)',
        height: '100%'
      }}
    >
      <Grid xs={11}>
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
        />
      </Grid>
      <Grid
        xs={1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: '#3f51b5',
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
