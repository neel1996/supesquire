import React, { useContext, useState } from 'react';

import { Cancel, Check } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, TextField } from '@mui/material';

import { ChatContext } from '../../context/Context';

export default function ChatTitleInput({
  chatId,
  chatTitle,
  setChatTitle,
  setIsEdit
}) {
  const { setCurrentDocument, setConversationHistory } =
    useContext(ChatContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = async () => {
    if (!chatTitle) return;

    setLoading(true);

    await fetch(`/api/edit-title`, {
      method: 'PATCH',
      body: JSON.stringify({ title: chatTitle, id: chatId })
    })
      .then((res) => {
        setLoading(false);

        if (!res.ok) {
          setError(true);
        } else {
          setError(false);
          setIsEdit(false);
          setChatTitle(chatTitle);
          setCurrentDocument((conversation) => ({
            ...conversation,
            title: chatTitle
          }));

          setConversationHistory((history) => {
            const index = history.findIndex((item) => item.checksum === chatId);
            if (index !== -1) {
              history[index].title = chatTitle;
            }
            return history;
          });
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <TextField
      fullWidth
      variant="filled"
      value={chatTitle}
      onChange={(e) => {
        setChatTitle(e.target.value);
      }}
      error={error}
      size="small"
      hiddenLabel
      autoFocus
      margin="none"
      disabled={loading}
      sx={{
        width: '100%'
      }}
      placeholder="Edit chat title"
      InputProps={{
        style: {
          color: '#c3cdfa'
        },
        endAdornment: (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& > *': {
                color: '#c3cdfa',
                maxWidth: '50px'
              }
            }}
          >
            {loading ? (
              <CircularProgress size={14} />
            ) : (
              <>
                <IconButton onClick={() => submitHandler()}>
                  <Check />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setIsEdit(false);
                  }}
                >
                  <Cancel />
                </IconButton>
              </>
            )}
          </Box>
        )
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          submitHandler();
          setIsEdit(false);
        } else if (e.key === 'Escape') {
          setIsEdit(false);
        }
      }}
    />
  );
}
