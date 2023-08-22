import React, { useContext, useState } from 'react';

import { ChatContext } from '@/app/context/Context';
import { DeleteForever, HistoryEdu } from '@mui/icons-material';
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material';

import DeleteDialog from './DeleteDialog';

export default function HistoryListItem({ isActive, conversation }) {
  const { setActiveChatId, setCurrentDocument, setOpenDraw } =
    useContext(ChatContext);
  const [showDelete, setShowDelete] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);

  return (
    <ListItem
      disablePadding
      onMouseOver={() => {
        setShowDelete(true);
      }}
      onMouseLeave={() => {
        setShowDelete(false);
      }}
    >
      {chatToDelete && (
        <DeleteDialog
          chatToDelete={chatToDelete}
          setChatToDelete={setChatToDelete}
          setShowDelete={setShowDelete}
        />
      )}
      <ListItemButton
        sx={{
          padding: '15px 10px',
          background: isActive ? '#7f8cd4' : '#313338',
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
          <Tooltip title={conversation.title} placement="bottom-end">
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
      {showDelete && (
        <ListItemIcon
          sx={{
            background: '#d47f97',
            display: 'flex',
            justifyContent: 'center',
            padding: '10px'
          }}
        >
          <IconButton
            onClick={() => {
              setChatToDelete(conversation.checksum);
              setActiveChatId(conversation.checksum);
            }}
          >
            <DeleteForever
              sx={{
                textAlign: 'center',
                color: '#2f2f2f',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '26px'
              }}
            />
          </IconButton>
        </ListItemIcon>
      )}
    </ListItem>
  );
}
