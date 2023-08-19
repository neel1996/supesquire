import { Face6, SmartToy } from '@mui/icons-material';
import { Card, Grid, Icon, ListItem } from '@mui/material';
import React, { useEffect } from 'react';

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
                {conversation.message?.split('\n').map((m) => {
                  return <div key={m}>{m}</div>;
                })}
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </ListItem>
  );
}
