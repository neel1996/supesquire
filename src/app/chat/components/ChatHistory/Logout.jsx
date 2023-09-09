import Link from 'next/link';

import { supabaseClient } from '@/app/supabaseClient';
import { LogoutRounded } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

export default function Logout() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginLeft: '-20px',
        marginBottom: '20px'
      }}
    >
      <Link href="/">
        <IconButton
          size="large"
          sx={{
            color: '#1e1f22',
            fontSize: '36px',
            backgroundColor: '#94a4ff',
            '&:hover': {
              backgroundColor: '#5c73f8',
              color: '#cccccc'
            }
          }}
          onClick={() => {
            supabaseClient.auth.signOut();
          }}
        >
          <LogoutRounded fontSize="36px" />
        </IconButton>
      </Link>
    </Box>
  );
}
