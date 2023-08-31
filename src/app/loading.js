'use client';

import React from 'react';
import { FallingLines } from 'react-loader-spinner';

import { Backdrop } from '@mui/material';

export default function Loading() {
  return (
    <Backdrop open={true}>
      <FallingLines color="#8b9aee" />
    </Backdrop>
  );
}
