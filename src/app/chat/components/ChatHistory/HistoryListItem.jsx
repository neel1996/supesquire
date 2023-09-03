import React, { useContext, useEffect, useState } from 'react';

import { HistoryEdu } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material';

import { ChatContext } from '../../context/Context';
import ActionButtons from './ActionButtons';
import ChatTitleInput from './ChatTitleInput';
import DeleteDialog from './DeleteDialog';

export default function HistoryListItem({ isActive, conversation }) {
  const { setActiveChatId, setCurrentDocument, setOpenDraw } =
    useContext(ChatContext);
  const [isEdit, setIsEdit] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [chatTitle, setChatTitle] = useState(conversation.title);

  useEffect(() => {
    return () => {
      setIsEdit(false);
      setChatToDelete(null);
      setChatTitle(conversation.title);
    };
  }, [conversation.title, isActive]);

  return (
    <ListItem
      disablePadding
      sx={{
        background: isActive ? '#42475f' : '#313338',
        '&:hover': {
          background: '#42475f'
        }
      }}
    >
      {chatToDelete && (
        <DeleteDialog
          chatToDelete={chatToDelete}
          setChatToDelete={setChatToDelete}
        />
      )}
      <ListItemButton
        sx={{
          padding: '15px 10px',
          color: '#ffffff',
          borderRadius: '1px',
          fontSize: '12px'
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
              {isActive && isEdit ? (
                <ChatTitleInput
                  chatId={conversation.checksum}
                  chatTitle={chatTitle}
                  setChatTitle={setChatTitle}
                  setIsEdit={setIsEdit}
                  setCurrentDocument={setCurrentDocument}
                />
              ) : (
                conversation.title
              )}
            </Typography>
          </Tooltip>
        </ListItemText>
      </ListItemButton>
      {isActive && !isEdit && (
        <ActionButtons
          chatId={conversation.checksum}
          setChatToDelete={setChatToDelete}
          setIsEdit={setIsEdit}
        />
      )}
    </ListItem>
  );
}
