import React, { useState } from 'react';
import { Dna } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { useHttpClient } from '@/useHttpClient';
import { Grid, Stack, Typography } from '@mui/material';

import ChatInput from '../chat/components/ChatElements/ChatInput';
import SearchResult from './SearchResult';

export default function Search() {
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetch } = useHttpClient();

  const submitHandler = async (query) => {
    setSearchResult(null);
    setLoading(true);
    const { result } = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error('Search failed with error :', err);
      });

    setSearchResult(result);
  };

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Grid
        item
        xs
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          form: {
            width: '100%',
            height: '80px'
          }
        }}
      >
        <Stack
          rowGap={1}
          sx={{
            marginBottom: '30px',
            marginTop: '-70px',
            color: '#9396a8'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xl: '60px',
                lg: '50px',
                xs: '40px'
              },
              '::first-letter': {
                color: '#7793f6'
              }
            }}
          >
            [S]upesquire search
          </Typography>
          <Typography>Search based on what you have uploaded</Typography>
        </Stack>
        <ChatInput
          submitHandler={submitHandler}
          placeHolder={'What are you looking for?'}
          mode="search"
        />
        {loading && (
          <>
            <Dna width={200} height={200} />
          </>
        )}
        {searchResult && (
          <Grid sx={{ width: '100%', maxHeight: 'calc(100vh - 400px)' }}>
            <SearchResult result={searchResult} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
