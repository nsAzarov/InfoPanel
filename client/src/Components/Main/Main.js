import { Box } from '@mui/material';
import React from 'react';
import { InfoPanel } from '../InfoPanel';

export const Main = () => {
  return (
    <Box sx={{ maxWidth: '70%', margin: '100px auto' }}>
      <InfoPanel />
    </Box>
  );
};
