import { Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ChatItem from './ChatItem';
import ChatInput from './ChatInput';
import { VariableSizeList as List } from 'react-window';
import { ChatContext } from '@/app/context/Context';
import { toast } from 'react-toastify';
import { Comment } from 'react-loader-spinner';
import ChatHeader from './ChatHeader';
import { Loader } from './Loader';

export default function ChatMessage() {
  const { activeChatId, socket, currentDocument } = useContext(ChatContext);

  const [conversations, setConversations] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);
  const rowHeights = useRef({});

  const scrollToBottom = useCallback(
    () => listRef?.current?.scrollToItem(conversations.length, 'end'),
    [conversations]
  );

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
                user: item.actor,
                message: item.message
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
  }, [activeChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations, scrollToBottom]);

  useEffect(() => {
    setConversations([]);
    chatRecords();
  }, [activeChatId, chatRecords]);

  useEffect(() => {
    socket?.on('ai_message', async (data) => {
      setConversations((prev) => {
        let temp = [...prev];
        temp.pop();

        return [
          ...temp,
          {
            user: 'ai',
            message: JSON.parse(data).message
          }
        ];
      });
    });

    socket?.on('chat_error', async (data) => {
      console.error({ data });

      setConversations((prev) => {
        let temp = [...prev];
        temp.pop();

        return [...temp];
      });

      toast.error('Cannot send message. Please try again later.', {
        toastId: 'chat_error'
      });
    });
  }, [activeChatId, socket]);

  const getRowHeight = (idx) => {
    return rowHeights.current[idx] + 20 || 80;
  };

  const submitHandler = async () => {
    socket?.emit(
      'message',
      JSON.stringify({
        documentId: activeChatId,
        message: userMessage,
        content: currentDocument?.content
      })
    );

    setUserMessage('');
    setConversations((prev) => {
      return [
        ...prev,
        {
          user: 'human',
          message: userMessage
        },
        {
          user: 'ai',
          message: (
            <Comment
              color="#ffffff"
              height={50}
              width={50}
              backgroundColor="#1f232d"
            />
          )
        }
      ];
    });
  };

  function Item({ style, index }) {
    const rowRef = useRef({});

    return (
      <ChatItem
        key={`chat-item-${activeChatId}-${index}`}
        rowRef={rowRef}
        rowHeights={rowHeights}
        listRef={listRef}
        style={style}
        rowPosition={index}
        conversation={conversations[index]}
      />
    );
  }

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
            <Card
              elevation={10}
              sx={{
                width: 'fit-content',
                padding: '20px',
                background: '#ecefff',
                borderRadius: '20px',
                margin: '0px auto'
              }}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={150}
                height={150}
                draggable={false}
              />
            </Card>
            <Typography sx={{ color: '#eeeeee', padding: '20px 0px' }}>
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
            {({ index, style }) => <Item style={style} index={index} />}
          </List>
        )}
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <form
          style={{
            marginBottom: '60px'
          }}
          onSubmit={(e) => {
            e.preventDefault();
            submitHandler();
          }}
        >
          <ChatInput
            userMessage={userMessage}
            setUserMessage={setUserMessage}
          />
        </form>
      )}
    </Grid>
  );
}
