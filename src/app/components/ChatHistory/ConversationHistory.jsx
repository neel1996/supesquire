import React, { useContext } from 'react';

import { ChatContext } from '@/app/context/Context';
import { ListItem, ListItemText, Typography } from '@mui/material';

import HistoryListItem from './HistoryListItem';

export default function ConversationHistory() {
  const { conversationHistory, activeChatId } = useContext(ChatContext);

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
        <HistoryListItem
          conversation={conversation}
          isActive={activeChatId === conversation.checksum}
          key={conversation.checksum}
        />
      ))}
    </>
  );
}
