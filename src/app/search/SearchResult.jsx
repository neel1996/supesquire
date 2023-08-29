import { Card, Stack } from '@mui/material';

import ContentBox from './ContentBox';
import ResultBox from './ResultBox';

export default function SearchResult({ result }) {
  return (
    <Stack
      sx={{
        padding: {
          md: '50px',
          xs: '0px'
        },
        '&.MuiPaper-root': {
          maxHeight: 'calc(100vh - 400px)',
          overflowY: 'auto'
        }
      }}
    >
      <Card
        sx={{
          marginBottom: '20px',
          padding: '20px',
          background: '#abb0d8',
          color: '#474a5f',
          borderRadius: '20px'
        }}
      >
        <ResultBox answer={result.answer} />
        <ContentBox
          heading="Relevant Document"
          content={result.document || 'No document found'}
        />
        <ContentBox heading="Matching content" content={result.content} />
      </Card>
    </Stack>
  );
}
