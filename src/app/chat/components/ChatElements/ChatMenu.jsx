import React, { useCallback, useState } from 'react';

import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

export default function ChatMenu({ showMenu, chatId, setConversations }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
  }, [chatId, setConversations]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        position: 'relative',
        marginTop: '-15px',
        marginBottom: '-5px',
        marginLeft: '10px'
      }}
    >
      <IconButton
        sx={{
          width: '30px',
          height: '30px'
        }}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      >
        {showMenu && (
          <ExpandMoreRounded
            sx={{
              color: 'white'
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
