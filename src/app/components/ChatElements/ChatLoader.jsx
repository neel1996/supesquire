import { SmartToy } from '@mui/icons-material';
import { Grid, Icon, ListItem } from '@mui/material';
import React from 'react';
import { Comment } from 'react-loader-spinner';

export default function ChatLoader({ style }) {
  let styles = {
    background: '#3f6fb5',
    color: '#ffffff',
    justifyContent: 'flex-start',
    icon: <SmartToy />,
    iconColor: '#75a4e8'
  };

  return (
    <ListItem
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
          <Comment
            color="#ffffff"
            height={60}
            width={60}
            backgroundColor="#3f6fb5"
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}
