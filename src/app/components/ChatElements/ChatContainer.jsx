import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import ChatItem from './ChatItem';
import ChatInput from './ChatInput';
import { FixedSizeList } from 'react-window';

export default function ChatMessage() {
  const [conversations, setConversations] = useState([]);
  const [userMessage, setUserMessage] = useState('');

  return (
    <Grid container flexDirection="column" height="100%">
      <Grid
        xs
        item
        sx={{
          height: '100%',
          userSelect: 'none',
          justifyContent: 'center',
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
          <FixedSizeList
            height={800}
            itemCount={conversations.length}
            itemSize={60}
            style={{
              width: '100%'
            }}
          >
            {({ index, style }) => {
              return (
                <ChatItem
                  style={style}
                  key={index}
                  conversation={conversations[index]}
                />
              );
            }}
          </FixedSizeList>
        )}
      </Grid>

      <form
        style={{
          marginBottom: '60px'
        }}
        onSubmit={(e) => {
          e.preventDefault();
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
