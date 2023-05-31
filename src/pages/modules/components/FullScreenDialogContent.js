import { Box, Container, Paper } from '@mui/material';
import React from 'react';

const FullScreenDialogContent = ({ children, ...props }) => {
  return (
    <Box
      component={Paper}
      flex="1"
      overflow={{
        overflowY: 'scroll'
      }}
      position="relative"
      py={4}
      {...props}
    >
      <Container maxWidth="sm">{children}</Container>
    </Box>
  );
};

export default React.memo(FullScreenDialogContent);