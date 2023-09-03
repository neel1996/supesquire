import React from 'react';

import { DeleteForever, Edit } from '@mui/icons-material';
import { IconButton, ListItemIcon } from '@mui/material';

export default function ActionButtons({ chatId, setIsEdit, setChatToDelete }) {
  return (
    <>
      <ListItemIcon
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minWidth: '20px'
        }}
      >
        <IconButton
          onClick={() => {
            setIsEdit((prev) => !prev);
          }}
        >
          <Edit
            sx={{
              textAlign: 'center',
              color: '#83b0d6',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '26px',
              '&:hover': {
                color: '#7998b2'
              }
            }}
          />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <IconButton
          onClick={() => {
            setChatToDelete(chatId);
          }}
        >
          <DeleteForever
            sx={{
              textAlign: 'center',
              color: '#e34d4d',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '26px',
              '&:hover': {
                color: '#a22727'
              }
            }}
          />
        </IconButton>
      </ListItemIcon>
    </>
  );
}
