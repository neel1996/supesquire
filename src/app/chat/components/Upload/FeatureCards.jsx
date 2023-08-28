import React from 'react';

import { History, MarkChatRead } from '@mui/icons-material';
import { Box, Icon, Typography } from '@mui/material';

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
            backgroundColor: '#3b3d4d',
            padding: '10px',
            boxShadow: '0px -1px 11px 0px rgb(148 ,164, 255, 0.19)',
            borderRadius: '10px',
            minWidth: '200px',
            maxWidth: {
              xl: '300px',
              xs: '200px'
            },
            width: {
              xl: '300px',
              xs: '220px'
            },
            margin: '20px 30px'
          }}
        >
          {feature.icon && (
            <Icon
              component={feature.icon}
              sx={{
                fontSize: {
                  xl: '60px',
                  lg: '50px',
                  md: '40px',
                  sm: '40px',
                  xs: '40px'
                },
                color: '#94a4ff'
              }}
            />
          )}
          <Typography
            sx={{
              padding: '20px 0px',
              width: '90%',
              marginLeft: 'auto',
              marginRight: 'auto',
              color: '#94a4ff',
              textAlign: 'left',
              fontSize: {
                xl: '18px',
                lg: '16px',
                md: '14px',
                sm: '14px',
                xs: '14px'
              }
            }}
          >
            {feature.description}
          </Typography>
        </Box>
      ))}
    </>
  );
}
