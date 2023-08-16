import { Grid } from '@mui/material';
import { Dna } from 'react-loader-spinner';

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
