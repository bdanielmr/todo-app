import React from 'react';
import { Box } from '@mui/material';
import StoreProvider from './store/StoreProvider';
import ViewsRouter from './router';

function App() {
  return (
    <StoreProvider>
      <Box>
        <ViewsRouter />
      </Box>
    </StoreProvider>
  );
}

export default App;
