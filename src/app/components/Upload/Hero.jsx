'use client';

import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

import { CloudUpload, UploadFileRounded } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { ChatContext } from '../../context/Context';
import FeatureCards from './FeatureCards';
import Loader from './Loader';
import UploadInput from './UploadInput';
import { generateChecksum } from './checksum';

export default function Hero() {
  const { setActiveChatId, setCurrentDocument, supabase } =
    useContext(ChatContext);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        toast.error('Please upload a pdf file', {
          position: 'bottom-left',
          autoClose: 3000,
          toastId: 'upload_error'
        });
        return;
      }

      setLoading(true);

      const file = acceptedFiles[0];
      const checksum = await generateChecksum(file);

      supabase.storage
        .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET)
        .upload(`${checksum}.pdf`, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'application/pdf'
        })
        .then(async () => {
          const res = await fetch('/api/process-document', {
            method: 'POST',
            body: JSON.stringify({ checksum, fileName: file.name })
          });
          if (!res.ok) {
            throw new Error('Error processing document');
          }

          const { title, fileName, content } = await res.json();

          setLoading(false);
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

          toast.error(error.toString(), {
            position: 'bottom-left',
            autoClose: 3000,
            toastId: 'upload_error'
          });
        });
    },
    [supabase, setActiveChatId, setCurrentDocument]
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
