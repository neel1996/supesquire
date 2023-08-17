import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useContext } from 'react';
import { ChatContext } from '../context/Context';
import { HistoryEdu } from '@mui/icons-material';

export default function ConversationHistory() {
  const {
    conversationHistory,
    activeChatId,
    setActiveChatId,
    setCurrentDocument,
    setOpenDraw
  } = useContext(ChatContext);

  return (
    <>
      {conversationHistory?.length === 0 && (
        <ListItem
          disablePadding
          sx={{
            padding: '15px 10px',
            background: '#535876',
            color: '#ffffff',
            borderRadius: '1px',
            fontSize: '12px',
            userSelect: 'none'
          }}
        >
          <ListItemText>
            <Typography variant="subtitle1">No conversations yet</Typography>
            <Typography variant="caption">
              Upload a document to start a conversation
            </Typography>
          </ListItemText>
        </ListItem>
      )}
      {conversationHistory.map((conversation) => (
        <ListItem disablePadding key={conversation.id}>
          <ListItemButton
            sx={{
              padding: '15px 10px',
              background:
                conversation.checksum === activeChatId ? '#7f8cd4' : '#313338',
              color: '#ffffff',
              borderRadius: '1px',
              fontSize: '12px',
              '&:hover': {
                background: '#7f8cd4'
              }
            }}
            onClick={() => {
              setActiveChatId(conversation.checksum);
              setCurrentDocument({
                title: conversation.title,
                id: conversation.checksum,
                fileName: conversation.document_name,
                content: conversation.content
              });
              setOpenDraw(false);
            }}
          >
            <ListItemIcon>
              <HistoryEdu
                sx={{
                  color: '#ffffff'
                }}
              />
            </ListItemIcon>
            <ListItemText>
              <Tooltip title={conversation.title} placement="right-end">
                <Typography
                  sx={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: '90%'
                  }}
                >
                  {conversation.title}
                </Typography>
              </Tooltip>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}
