"use client";

import {
  CloudUpload,
  History,
  MarkChatRead,
  UploadFileRounded,
} from "@mui/icons-material";
import { Box, Container, Grid, Icon, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Hero() {
  const features = [
    {
      title: "Chat",
      description: "Chat with your documents and return to it anytime",
      icon: MarkChatRead,
    },
    {
      title: "History",
      description: "View your chat history with your document",
      icon: History,
    },
  ];

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    fetch("/api/upload", {
      method: "POST",
      body: acceptedFiles[0],
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        textAlign: "center",
        overflowY: "auto",
        opacity: isDragActive ? 0.5 : 1,
        transition: "opacity 0.3s ease-in-out",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Container
        sx={{
          padding: "10px",
        }}
      >
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
        }}
      >
        chat with your document in real time
      </Typography>
      <Typography sx={{ color: "#7f7f7f", padding: "10px 0px" }}>
        powered by OpenAI and Supabase
      </Typography>
      <Stack
        direction="row"
        flexWrap={"wrap"}
        justifyContent="center"
        padding="20px"
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "20px",
              boxShadow: "0px 0px 12px 0px rgb(63,81,181,0.17)",
              borderRadius: "10px",
              width: "350px",
              minWidth: "300px",
              margin: "20px 30px",
            }}
          >
            {feature.icon && (
              <Icon
                component={feature.icon}
                sx={{
                  fontSize: "60px",
                  color: "#3f51b5",
                }}
              />
            )}
            <Typography
              sx={{
                padding: "20px 0px",
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                color: "#7f7f7f",
                textAlign: "left",
                fontSize: "18px",
              }}
            >
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Stack>
      <Stack
        sx={{
          bottom: 0,
          position: "fixed",
        }}
      >
        {isDragActive ? (
          <CloudUpload
            sx={{
              color: "rgb(63,81,181)",
              fontSize: "350px",
              margin: "20px 0px",
            }}
          />
        ) : (
          <Grid
            sx={{
              color: "#a4a8c2",
            }}
          >
            <UploadFileRounded
              sx={{
                fontSize: "30px",
              }}
            />
            <Typography
              sx={{
                fontSize: "14px",
                margin: "10px 0px",
              }}
            >
              Drag and drop to upload the document
            </Typography>
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
