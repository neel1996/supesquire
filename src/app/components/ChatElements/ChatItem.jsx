import format from 'date-fns/format';
import React, { useEffect } from 'react';

import { Face6, SmartToy } from '@mui/icons-material';
import { Box, Card, Grid, Icon, ListItem, Typography } from '@mui/material';

export default function ChatItem({
  rowPosition,
  style,
  conversation,
  listRef,
  rowRef,
  rowHeights
}) {
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
    rowHeights.current[rowPosition] = rowRef.current.clientHeight;
    listRef.current.resetAfterIndex(0);
  }, [rowRef, rowHeights, listRef, rowPosition]);

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
            fontWeight: '500'
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
              margin: '5px'
            }}
          >
            {conversation?.loader ? (
              <>{conversation.message}</>
            ) : (
              <>
                {conversation.message?.split('\n').map((m, idx) => {
                  return <div key={m + idx}>{m}</div>;
                })}
              </>
            )}
            {conversation.created_at && (
              <TimeStamp conversation={conversation} />
            )}
          </Card>
        </Grid>
      </Grid>
    </ListItem>
  );
}
