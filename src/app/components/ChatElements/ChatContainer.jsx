import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import ChatItem from './ChatItem';
import ChatInput from './ChatInput';
import { VariableSizeList as List } from 'react-window';
import { ChatContext } from '@/app/context/Context';

export default function ChatMessage() {
  const { activeChatId, socket } = useContext(ChatContext);

  const [conversations, setConversations] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  const listRef = useRef(null);
  const rowHeights = useRef({});

  const scrollToBottom = () =>
    listRef?.current?.scrollToItem(conversations.length);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  useEffect(() => {
    socket?.on('ai_message', async (data) => {
      console.info({ data });

      setConversations((prev) => {
        return [
          ...prev,
          {
            user: 'ai',
            message: JSON.parse(data).message
          }
        ];
      });
    });
  }, [socket]);

  const getRowHeight = (idx) => {
    return rowHeights.current[idx] + 20 || 80;
  };

  return (
    <Grid container flexDirection="column" height="100%">
      <Grid
        xs
        item
        id="chat-grid"
        sx={{
          height: '100%',
          userSelect: 'none',
          justifyContent: conversations.length ? 'flex-end' : 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {conversations.length === 0 ? (
          <>
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={150}
              draggable={false}
            />
            <Typography sx={{ color: '#7f7f7f', padding: '10px 0px' }}>
              Your document has been processed! Quiz away!
            </Typography>
          </>
        ) : (
          <List
            height={800}
            itemCount={conversations.length}
            itemSize={getRowHeight}
            ref={listRef}
            style={{
              width: '100%',
              height: 'auto',
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '20px 0px'
            }}
          >
            {({ index, style }) => {
              const rowRef = useRef({});

              return (
                <ChatItem
                  rowRef={rowRef}
                  rowHeights={rowHeights}
                  listRef={listRef}
                  style={style}
                  rowPosition={index}
                  conversation={conversations[index]}
                />
              );
            }}
          </List>
        )}
      </Grid>

      <form
        style={{
          marginBottom: '60px'
        }}
        onSubmit={(e) => {
          e.preventDefault();

          if (socket) {
            socket.emit(
              'message',
              JSON.stringify({
                documentId: activeChatId,
                message: userMessage
              })
            );
          }

          setUserMessage('');

          setConversations((prev) => {
            return [
              ...prev,
              {
                user: 'human',
                message: userMessage
              }
            ];
          });
        }}
      >
        <ChatInput userMessage={userMessage} setUserMessage={setUserMessage} />
      </form>
    </Grid>
  );
}
