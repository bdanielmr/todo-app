import React from 'react';
import { Box } from '@mui/material';
import { BoardTask } from './components/BoardTask';
import StoreProvider from './store/StoreProvider';

type priority = '' | 'bajo' | 'medio' | 'largo';
function App() {
  const items = [
    {
      id: 1,
      label: 'Elemento 1',
      idTimer: 'timer1',
      completed: false,
      completedAt: 120,
      priority: 'medio' as priority,
    },
    {
      id: 2,
      label: 'Elemento 2',
      idTimer: 'timer2',
      completed: false,
      completedAt: 2300,
      priority: 'bajo' as priority,
    },
    {
      id: 3,
      label: 'Elemento 3',
      idTimer: 'timer3',
      completed: false,
      completedAt: 800,
      priority: 'largo' as priority,
    },
    {
      id: 4,
      label: 'Elemento 4',
      idTimer: 'timer4',
      completed: true,
      completedAt: 1200,
      priority: 'largo' as priority,
    },
  ];
  return (
    <StoreProvider>
      <Box>
        <p>todo app </p>
        <BoardTask items={items} />
      </Box>
    </StoreProvider>
  );
}

export default App;
