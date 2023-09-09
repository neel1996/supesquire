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
        bottom: 0,
        right: 0
      }}
    >
      <Link href="/">
        <IconButton
          size="large"
          sx={{
            color: '#94a4ff',
            fontSize: '36px'
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
