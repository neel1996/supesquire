import { MarkChatRead, History } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';
import React from 'react';

export default function FeatureCards() {
  const features = [
    {
      title: 'Chat',
      description: 'Chat with your documents and return to it anytime',
      icon: MarkChatRead
    },
    {
      title: 'History',
      description: 'View your chat history with your document',
      icon: History
    }
  ];

  return (
    <>
      {features.map((feature, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            boxShadow: '0px 0px 12px 0px rgb(63,81,181,0.17)',
            borderRadius: '10px',
            width: '350px',
            minWidth: '300px',
            margin: '20px 30px'
          }}
        >
          {feature.icon && (
            <Icon
              component={feature.icon}
              sx={{
                fontSize: '60px',
                color: '#3f51b5'
              }}
            />
          )}
          <Typography
            sx={{
              padding: '20px 0px',
              width: '80%',
              marginLeft: 'auto',
              marginRight: 'auto',
              color: '#7f7f7f',
              textAlign: 'left',
              fontSize: '18px'
            }}
          >
            {feature.description}
          </Typography>
        </Box>
      ))}
    </>
  );
}
