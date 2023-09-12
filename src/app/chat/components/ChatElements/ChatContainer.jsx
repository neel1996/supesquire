import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import LogoCard from '@/app/LogoCard';
import { useHttpClient } from '@/useHttpClient';
import { Alert, Grid, List, Typography } from '@mui/material';

import { ChatContext } from '../../context/Context';
import { useChatStream } from '../../useChatStream';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatItem from './ChatItem';
import { Loader } from './Loader';

export default function ChatMessage() {
  const { activeChatId, currentDocument } = useContext(ChatContext);

  const [conversations, setConversations] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const { fetch } = useHttpClient();

  const { submitHandler } = useChatStream();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations.length]);

  const chatRecords = useCallback(async () => {
    setLoading(true);

    await fetch(`/api/chat-records`, {
      method: 'POST',
      body: JSON.stringify({
        checksum: activeChatId
      })
    })
      .then(async (res) => {
        setLoading(false);
        const data = await res.json();
        setConversations((prev) => {
          return [
            ...prev,
            ...data.map((item) => {
              return {
                id: item.id,
                user: item.actor,
                message: item.message,
                created_at: item.created_at
              };
            })
          ];
        });
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        toast.error('Cannot fetch chat records. Please try again later.', {
          toastId: 'chat_error'
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChatId]);

  useEffect(() => {
    setConversations([]);
    chatRecords();
  }, [activeChatId, chatRecords]);

  return (
    <Grid container flexDirection="column" height="100%">
      {conversations && conversations.length > 0 && <ChatHeader />}
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
            <LogoCard />
            <Typography sx={{ color: '#eeeeee', padding: '20px 0px' }}>
              Your document has been processed! Quiz away!
            </Typography>
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              Ask anything about the <b>{currentDocument?.title}</b>
            </Alert>
          </>
        ) : (
          <List
            height={800}
            ref={scrollRef}
            style={{
              width: '100%',
              height: 'auto',
              justifyContent: 'flex-end',
              padding: '20px 0px',
              overflow: 'auto'
            }}
          >
            {conversations.map((conversation) => {
              return (
                <ChatItem
                  key={conversation.id}
                  conversation={conversation}
                  setConversations={setConversations}
                />
              );
            })}
            {newMessage && (
              <ChatItem
                key={newMessage.id}
                conversation={newMessage}
                setConversations={setConversations}
              />
            )}
            <ChatItem autoFocus={true} />
          </List>
        )}
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <ChatInput
          submitHandler={(message) => {
            submitHandler({
              documentId: activeChatId,
              message,
              setConversations,
              setNewMessage
            });
          }}
        />
      )}
    </Grid>
  );
}
