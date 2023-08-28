import { Dna } from 'react-loader-spinner';

import { Grid } from '@mui/material';

export const Loader = () => {
  return (
    <Grid
      xs
      item
      sx={{
        height: '100%',
        userSelect: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <Dna height={250} width={250} />
    </Grid>
  );
};
