import React from 'react';
import { Box } from '@mui/material';
import { HomeTask } from './views/HomeTask';
import StoreProvider from './store/StoreProvider';

function App() {
  return (
    <StoreProvider>
      <Box>
        <HomeTask />
      </Box>
    </StoreProvider>
  );
}

export default App;
