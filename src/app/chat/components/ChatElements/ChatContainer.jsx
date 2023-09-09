import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { toast } from 'react-toastify';
import { VariableSizeList as List } from 'react-window';

import LogoCard from '@/app/LogoCard';
import { supabaseClient } from '@/app/supabaseClient';
import { Alert, Grid, Typography } from '@mui/material';

import { ChatContext } from '../../context/Context';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatItem from './ChatItem';
import { Loader } from './Loader';

export default function ChatMessage() {
  const { activeChatId, currentDocument } = useContext(ChatContext);

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);
  const rowHeights = useRef({});

  const channel = supabaseClient?.channel(activeChatId);

  const scrollToBottom = useCallback(
    () => listRef?.current?.scrollToItem(conversations.length, 'end'),
    [conversations]
  );

  const getRowHeight = (idx) => {
    return rowHeights.current[idx] + 30 || 100;
  };

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
  }, [activeChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [conversations.length, scrollToBottom]);

  useEffect(() => {
    setConversations([]);
    chatRecords();
  }, [activeChatId, chatRecords]);

  const errorEventListener = async (error) => {
    console.error({ error });

    setConversations((prev) => {
      let temp = [...prev];
      const popped = temp.pop();
      if (popped.loader) {
        return temp;
      }

      return prev;
    });

    toast.error('Cannot get the answer. Please try again later.', {
      toastId: 'chat_error',
      position: 'bottom-left'
    });
  };

  useEffect(() => {
    channel
      .on('broadcast', { event: 'ai_message' }, ({ payload }) => {
        setConversations((prev) => {
          let temp = [...prev];
          temp.pop();

          return [
            ...temp,
            {
              user: 'ai',
              message: payload?.message,
              created_at: new Date().toString()
            }
          ];
        });
      })
      .on('broadcast', { event: 'chat_error' }, errorEventListener)
      .subscribe();
  }, [channel]);

  const submitHandler = async (message) => {
    if (message?.length === 0) {
      return;
    }

    fetch('/api/inference', {
      method: 'POST',
      body: JSON.stringify({
        message,
        documentId: activeChatId
      })
    });

    setConversations((prev) => {
      return [
        ...prev,
        {
          user: 'human',
          message,
          created_at: new Date().toString()
        },
        {
          user: 'ai',
          loader: true
        }
      ];
    });
  };

  const Item = memo(function Item({ style, index }) {
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
        setConversations={setConversations}
      />
    );
  });

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
      {loading ? <Loader /> : <ChatInput submitHandler={submitHandler} />}
    </Grid>
  );
}
