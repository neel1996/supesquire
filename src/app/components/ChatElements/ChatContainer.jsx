import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import ChatItem from './ChatItem';
import ChatInput from './ChatInput';
import { VariableSizeList as List } from 'react-window';

export default function ChatMessage() {
  const testConversations = [
    {
      user: 'human',
      message:
        'Hey, have you ever wondered about the mysteries of the universe?'
    },
    {
      user: 'ai',
      message: 'Absolutely! Exploring the cosmos is a fascinating endeavor.'
    },
    {
      user: 'human',
      message:
        "I agree. It's mind-boggling to think about the vastness of space."
    },
    {
      user: 'ai',
      message: 'Indeed, and the more we discover, the more questions arise.'
    },
    {
      user: 'human',
      message:
        "That's the beauty of science, the quest for knowledge is never-ending."
    },
    {
      user: 'ai',
      message:
        "True, and it's incredible how far we've come in understanding so much."
    },
    {
      user: 'human',
      message:
        "Do you think we'll ever achieve interstellar travel in the future?"
    },
    {
      user: 'ai',
      message:
        "It's a challenging goal, but technological advancements continue to surprise us."
    },
    {
      user: 'human',
      message:
        'I hope to witness humanity becoming an interplanetary species one day.'
    },
    {
      user: 'ai',
      message:
        "The dream of exploring other planets is shared by many. It's an exciting vision."
    },
    {
      user: 'human',
      message:
        "Agreed. Let's keep our fingers crossed for the future of space exploration."
    },
    {
      user: 'ai',
      message: 'Absolutely, and who knows what incredible discoveries await us.'
    },
    {
      user: 'human',
      message: "Thanks for the chat! It's been great discussing the cosmos."
    },
    {
      user: 'ai',
      message:
        'Likewise! Feel free to reach out whenever you want to explore more ideas.'
    },
    {
      user: 'human',
      message: 'Will do. Take care and keep reaching for the stars!'
    },
    {
      user: 'ai',
      message:
        "In an ever-evolving world, the concept of lifelong learning has taken on a paramount significance. It embodies the idea that education is not confined to the early years of life but is a continuous and dynamic process that spans across the entirety of one's existence. Lifelong learning acknowledges that the acquisition of knowledge, skills, and insights is not a finite endeavor but an ongoing journey that enriches and empowers individuals to adapt, innovate, and thrive in a rapidly changing landscape. This philosophy resonates across disciplines, from the sciences to the arts, from technology to philosophy, as it recognizes that every facet of human endeavor is susceptible to transformation and progression. With the advent of the digital age, the accessibility of information has become unprecedented, and the opportunities for learning have proliferated beyond traditional boundaries. Embracing lifelong learning fosters a mindset of curiosity, open-mindedness, and resilience, enabling individuals to confront challenges with a proactive and adaptable approach. Moreover, it fosters a sense of fulfillment, as the pursuit of new knowledge and the mastery of new skills instill a sense of accomplishment and self-growth. As societies continue to evolve, those who engage in lifelong learning become torchbearers of progress, advocates of innovation, and beacons of inspiration for generations to come. In essence, lifelong learning is the cornerstone of personal and societal development, a never-ending voyage that empowers individuals to navigate the seas of change with confidence and purpose."
    }
  ];

  const [conversations, setConversations] = useState([...testConversations]);
  const [userMessage, setUserMessage] = useState('');
  const listRef = useRef(null);
  const rowHeights = useRef({});

  const scrollToBottom = () =>
    listRef?.current?.scrollToItem(conversations.length);

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

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
