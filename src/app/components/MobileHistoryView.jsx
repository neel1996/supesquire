import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Drawer, Fab } from '@mui/material';
import React, { useContext } from 'react';
import History from './History';
import { ChatContext } from '../context/Context';

export default function MobileHistoryView() {
  const { openDraw, setOpenDraw } = useContext(ChatContext);

  return (
    <Box
      display={{
        lg: 'none'
      }}
    >
      <Fab
        variant="circular"
        sx={{
          width: '80px',
          height: '80px',
          position: 'fixed',
          backgroundColor: '#94a4ff',
          color: '#576195',
          bottom: 0,
          left: 0,
          right: 0,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '-40px'
        }}
        onClick={() => setOpenDraw((prev) => !prev)}
      >
        <Box
          sx={{
            marginTop: '-10px',
            fontSize: '70px'
          }}
        >
          <KeyboardArrowUp fontSize="70px" />
        </Box>
      </Fab>
      <Drawer open={openDraw} onClose={() => setOpenDraw(false)}>
        <Box
          sx={{
            backgroundColor: '#1e1f22',
            height: '100vh',
            boxShadow: '0px 0px 12px 0px rgb(63,81,181,0.17)',
            width: {
              xs: '280px'
            }
          }}
        >
          <History />
        </Box>
      </Drawer>
    </Box>
  );
}
