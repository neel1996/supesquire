import { Face6, SmartToy } from '@mui/icons-material';
import { Card, Grid, Icon, ListItem } from '@mui/material';
import React, { useEffect, useRef } from 'react';

export default function ChatItem({
  rowPosition,
  style,
  conversation,
  listRef,
  rowRef,
  rowHeights
}) {
  let styles = {
    background: '#e3fde9',
    color: '#404667',
    justifyContent: 'flex-end',
    icon: <Face6 />,
    iconColor: '#747b76'
  };

  if (conversation.user == 'ai') {
    styles = {
      ...styles,
      background: '#3f6fb5',
      color: '#ffffff',
      justifyContent: 'flex-start',
      icon: <SmartToy />,
      iconColor: '#75a4e8'
    };
  }

  useEffect(() => {
    rowHeights.current[rowPosition] = rowRef.current.clientHeight;
    listRef.current.resetAfterIndex(0);
  }, [rowRef]);

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
              width: conversation.user === 'ai' ? '70%' : 'fit-content',
              padding: '10px',
              background: styles.background,
              color: styles.color,
              fontWeight: '500',
              margin: '5px'
            }}
          >
            {conversation.message}
          </Card>
        </Grid>
      </Grid>
    </ListItem>
  );
}
