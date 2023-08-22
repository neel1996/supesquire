'use client';

import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { CloudUpload, UploadFileRounded } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { ChatContext } from '../../context/Context';
import FeatureCards from './FeatureCards';
import Loader from './Loader';
import UploadInput from './UploadInput';

export default function Hero() {
  const { setActiveChatId, setCurrentDocument } = useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        toast.error('Please upload a pdf file', {
          position: 'bottom-left',
          autoClose: 3000,
          toastId: 'upload_error'
        });
        return;
      }

      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      setLoading(true);
      axios({
        method: 'post',
        url: '/api/upload',
        data: formData
      })
        .then((response) => {
          setLoading(false);
          const { checksum, title, fileName, content } = response.data;
          setActiveChatId(checksum);
          setCurrentDocument({
            title,
            id: checksum,
            fileName,
            content
          });
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);

          toast.error('Error uploading file', {
            position: 'bottom-left',
            autoClose: 3000,
            toastId: 'upload_error'
          });
        });
    },
    [setActiveChatId, setLoading, setCurrentDocument]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf']
    }
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
        overflow: 'hidden',
        opacity: isDragActive ? 0.5 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}
      {...getRootProps()}
    >
      <UploadInput getInputProps={getInputProps} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            padding="20px"
          >
            <FeatureCards />
          </Stack>
          <Stack
            display={{
              xl: 'block',
              lg: 'block',
              xs: 'none'
            }}
          >
            <Grid
              sx={{
                color: '#a4a8c2'
              }}
            >
              <UploadFileRounded
                sx={{
                  fontSize: '30px'
                }}
              />
              <Typography
                sx={{
                  fontSize: {
                    xl: '14px',
                    xs: '12px'
                  },
                  margin: '10px 0px'
                }}
              >
                Drag and drop to upload the document
              </Typography>
            </Grid>
          </Stack>
          <Stack
            sx={{
              bottom: 0,
              position: 'fixed',
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            {isDragActive && (
              <CloudUpload
                sx={{
                  color: 'rgb(63,81,181)',
                  fontSize: '350px',
                  margin: '20px 0px'
                }}
              />
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}
