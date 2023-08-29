import { useRouter } from 'next/navigation';
import { useContext } from 'react';

import { AddBox, HistoryOutlined, Home } from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  List,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';

import { ChatContext } from '../../context/Context';
import ConversationHistory from './ConversationHistory';

export default function History() {
  const route = useRouter();

  const { conversationHistory, setActiveChatId, setOpenDraw } =
    useContext(ChatContext);

  const FallbackSkeleton = () => {
    return (
      <Grid
        container
        sx={{
          padding: '15px',
          background: '#95a0dd',
          borderRadius: '1px',
          alignItems: 'center'
        }}
      >
        <Grid item xs={2}>
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            animation="pulse"
          />
        </Grid>
        <Grid item xs={10}>
          <Skeleton variant="text" width={200} height={20} />
          <Skeleton variant="text" width={100} height={10} />
        </Grid>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1e1f22',
        height: '100vh',
        boxShadow: '0px 0px 12px 0px rgb(63,81,181,0.17)'
      }}
    >
      <Grid container textAlign="center" alignItems="center" padding="10px 0px">
        <Grid item xs={1}>
          <IconButton
            sx={{
              color: '#94a4ff'
            }}
            onClick={() => {
              setActiveChatId(null);
              setOpenDraw(false);
              route.push('/');
            }}
          >
            <Home />
          </IconButton>
        </Grid>
        <Grid item xs={9}>
          <Stack
            sx={{
              color: '#edf0ff',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '5px 20px',
              fontSize: '24px'
            }}
          >
            <HistoryOutlined />
            <Typography
              variant="caption"
              sx={{
                textAlign: 'left',
                padding: '10px',
                fontSize: '20px',
                fontWeight: 500
              }}
            >
              Chat History
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            sx={{
              color: '#94a4ff'
            }}
            onClick={() => {
              setActiveChatId(null);
              setOpenDraw(false);
            }}
          >
            <AddBox
              sx={{
                fontSize: '36px'
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <List
        sx={{
          padding: '0px'
        }}
      >
        {conversationHistory === null ? (
          <FallbackSkeleton />
        ) : (
          <ConversationHistory />
        )}
      </List>
    </Box>
  );
}
