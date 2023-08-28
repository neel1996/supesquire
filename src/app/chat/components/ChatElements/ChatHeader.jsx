import { useContext } from 'react';

import { supabaseClient } from '@/app/supabaseClient';
import { Download, PictureAsPdf } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography } from '@mui/material';

import { ChatContext } from '../../context/Context';

export default function ChatHeader() {
  const { currentDocument } = useContext(ChatContext);

  return (
    <Grid
      item
      sx={{
        backgroundColor: '#313338',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
        width: '100%',
        height: '83px',
        boxShadow: '9px 0px 17px 0px rgba(0,0,0,0.75)'
      }}
    >
      <Grid
        item
        xs
        sx={{
          display: 'flex',
          padding: '0px 20px',
          alignItems: 'center'
        }}
      >
        <IconButton size="large">
          <PictureAsPdf
            sx={{
              color: '#ffffff',
              fontSize: '40px'
            }}
          />
        </IconButton>
        <Stack
          color="#ffffff"
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: '90%'
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {currentDocument?.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden'
            }}
          >
            {currentDocument?.fileName}
          </Typography>
        </Stack>
        <IconButton
          size="large"
          sx={{
            margin: '0px 20px'
          }}
          onClick={async () => {
            const { data } = await supabaseClient.storage
              .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
              .download(`${currentDocument?.id}.pdf`);

            await data.arrayBuffer().then((buffer) => {
              const blob = new Blob([buffer], { type: 'application/pdf' });
              const url = URL.createObjectURL(blob);
              window.open(url);
            });
          }}
        >
          <Download
            sx={{
              color: '#ffffff',
              fontSize: '30px'
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}
