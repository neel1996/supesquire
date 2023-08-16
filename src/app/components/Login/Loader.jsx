import { Backdrop } from '@mui/material';
import { Dna } from 'react-loader-spinner';

export default function Loader() {
  return (
    <Backdrop
      open={true}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor: 'rgb(36,37,96,0.76)'
      }}
    >
      <Dna height={500} width={500} />
    </Backdrop>
  );
}
