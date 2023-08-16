import {
  AddBox,
  HistoryEdu,
  HistoryOutlined
} from '@mui/icons-material';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { ChatContext } from '../context/Context';

export default function History() {
  const {
    conversationHistory,
    activeChatId,
    setActiveChatId,
    setCurrentDocument
  } = useContext(ChatContext);

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
      <Grid
        container
        textAlign="center"
        alignItems="center"
        justifyContent="space-between"
        padding="10px 0px"
      >
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
        <Grid item xs>
          <IconButton
            sx={{
              color: '#94a4ff'
            }}
            onClick={() => {
              setActiveChatId(null);
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
          conversationHistory.map((conversation) => (
            <ListItem disablePadding key={conversation.id}>
              <ListItemButton
                sx={{
                  padding: '15px 10px',
                  background:
                    conversation.checksum === activeChatId
                      ? '#7f8cd4'
                      : '#313338',
                  color: '#ffffff',
                  borderRadius: '1px',
                  fontSize: '12px',
                  '&:hover': {
                    background: '#7f8cd4'
                  }
                }}
                onClick={() => {
                  setActiveChatId(conversation.checksum);
                  setCurrentDocument({
                    title: conversation.title,
                    id: conversation.checksum,
                    fileName: conversation.document_name,
                    content: conversation.content
                  });
                }}
              >
                <ListItemIcon>
                  <HistoryEdu
                    sx={{
                      color: '#ffffff'
                    }}
                  />
                </ListItemIcon>
                <ListItemText>
                  <Tooltip title={conversation.title} placement="right-end">
                    <Typography
                      sx={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        width: '90%'
                      }}
                    >
                      {conversation.title}
                    </Typography>
                  </Tooltip>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
