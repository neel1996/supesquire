import format from 'date-fns/format';
import { memo, useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import CodeBlock from '@/app/CodeBlock';
import { Face6, SmartToy } from '@mui/icons-material';
import { Box, Card, Grid, Icon, ListItem, Typography } from '@mui/material';

import ChatMenu from './ChatMenu';

export default memo(function ChatItem({
  rowPosition,
  style,
  conversation,
  setConversations,
  listRef,
  rowRef,
  rowHeights
}) {
  const [showMenu, setShowMenu] = useState(false);

  let styles = {
    background: '#4b637d',
    color: '#ffffff',
    justifyContent: 'flex-end',
    icon: <Face6 />,
    iconColor: '#92aac3'
  };

  if (conversation.user == 'ai') {
    styles = {
      ...styles,
      background: '#1f232d ',
      color: '#ffffff',
      justifyContent: 'flex-start',
      icon: <SmartToy />,
      iconColor: '#8990a1'
    };
  }

  useEffect(() => {
    if (typeof window?.MathJax !== 'undefined') {
      window.MathJax = {
        ...window.MathJax,
        tex: {
          inlineMath: [
            ['$', '$'],
            ['\\(', '\\)']
          ],
          packages: { '[+]': ['mhchem', 'color'] },
          color: {
            padding: '5px',
            borderWidth: '2px'
          }
        },
        loader: { load: ['[tex]/mhchem', '[tex]/color'] }
      };

      window.MathJax.typesetClear();
      window.MathJax.typesetPromise();
    }
  }, []);

  useEffect(() => {
    rowHeights.current[rowPosition] = rowRef.current.clientHeight;
    listRef.current.resetAfterIndex(0);
  }, [rowRef, rowHeights, listRef, rowPosition]);

  if (conversation.user === 'ai' && conversation.loader) {
    return (
      <ListItem
        key={rowPosition}
        sx={{
          display: 'flex',
          justifyContent: styles.justifyContent,
          ...style
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#a4abce',
            gap: '10px',
            margin: '10px 30px'
          }}
        >
          <ThreeDots color="#a4abce" height="70" />
          <Typography variant="body1">AI is thinking...</Typography>
        </Box>
      </ListItem>
    );
  }

  const TimeStamp = ({ conversation }) => {
    let formattedTimestamp;
    try {
      formattedTimestamp = format(
        new Date(conversation.created_at),
        'dd MMM y, hh:mm aaa'
      );
    } catch (e) {
      console.error(e);
      return;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          marginTop: '5px'
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '10px',
            color: '#a8adb2',
            fontWeight: '500',
            userSelect: 'none'
          }}
        >
          {formattedTimestamp}
        </Typography>
      </Box>
    );
  };

  return (
    <ListItem
      key={rowPosition}
      sx={{
        display: 'flex',
        justifyContent: styles.justifyContent,
        ...style
      }}
    >
      <Grid
        sx={{
          alignItems: 'center',
          alignContent: 'center',
          display: 'flex',
          width: 'fit-content'
        }}
      >
        <Grid item>
          <Icon
            sx={{
              color: styles.iconColor
            }}
          >
            {styles.icon}
          </Icon>
        </Grid>
        <Grid>
          <Card
            elevation={5}
            ref={rowRef}
            sx={{
              width: conversation.user === 'ai' ? '90%' : 'fit-content',
              padding: '10px',
              background: styles.background,
              color: styles.color,
              fontWeight: '500',
              fontSize: {
                xl: '14px',
                xs: '12px'
              },
              margin: '5px',
              userSelect: 'text'
            }}
            onMouseEnter={() => {
              setShowMenu(true);
            }}
            onMouseLeave={() => {
              setShowMenu(false);
            }}
          >
            <ChatMenu
              showMenu={showMenu}
              chatId={conversation.id}
              setConversations={setConversations}
            />
            <CodeBlock message={conversation.message} />
            {conversation.created_at && (
              <TimeStamp conversation={conversation} />
            )}
          </Card>
        </Grid>
      </Grid>
    </ListItem>
  );
});
