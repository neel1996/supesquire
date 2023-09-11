import React, { useCallback, useState } from 'react';

import { useHttpClient } from '@/useHttpClient';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

export default function ChatMenu({ showMenu, chatId, setConversations, user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { fetch } = useHttpClient();

  const handleDelete = useCallback(() => {
    fetch(`/api/chat/message?id=${chatId}`, {
      method: 'DELETE'
    }).then((res) => {
      if (res.ok) {
        setAnchorEl(null);
        setConversations((prev) => {
          return prev.filter((item) => item.id !== chatId);
        });
        return;
      }

      setAnchorEl(null);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId, setConversations]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'relative',
        marginLeft: '10px'
      }}
    >
      <IconButton
        sx={{
          width: '30px',
          height: '30px',
          position: 'absolute'
        }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        {showMenu && (
          <ExpandMoreRounded
            sx={{
              color: 'white',
              padding: '5px',
              background: user === 'ai' ? '#1f232d' : '#4b637d',
              boxShadow:
                user === 'ai'
                  ? '-7px 1px 13px 12px #1f232d'
                  : '-5px -4px 3px 5px rgb(75, 99, 125, 0.88)',
              borderRadius: '20px'
            }}
          />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => {
          setAnchorEl(null);
        }}
        sx={{
          '.MuiMenu-paper > *': {
            background: '#313338',
            color: '#d56f6f'
          }
        }}
      >
        <MenuItem onClick={handleDelete}>
          <Typography variant="body1">Delete</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
