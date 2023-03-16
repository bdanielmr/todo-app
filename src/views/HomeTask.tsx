/* eslint-disable */
import React, { useState, useContext } from 'react';
import { Grid, Box } from '@mui/material';

import { StoreContext } from '../store/StoreProvider';
import { StoreContextType, HomeType, Task } from '../utils/types';
import { CardTaskButton } from '../components/CardTaskButton';
import { BoardTask } from '../components/BoardTask';

type LayoutProps = {
  children?: React.ReactNode;
};

function HomeTask({ children }: LayoutProps) {
  const { state, dispatch } = useContext<StoreContextType | null>(
    StoreContext,
  ) || {
    state: {
      dataBoardTask: [] as Task[],
      dataHome: [] as unknown as HomeType,
    },
    dispatch: action => {},
  };
  const {
    dataHome,
    dataBoardTask,
  }: { dataHome: HomeType; dataBoardTask: Task[] } = state;
  const [dataBoard, setDataBoard] = useState(dataBoardTask);
  const [lengthTask, setLengthTask] = useState(dataBoard.length);

  const handleCreateTask = () => {
    const newItem = {
      id: lengthTask + 1,
      title: `new task ${lengthTask + 1}`,
      name: `new task ${lengthTask + 1}`,
      description: 'new description',
      column: 'Stories',
      completed: false,
      time: { initialTime: 0, currentTime: 0, finishTime: 0 },
      type: 'todos',
    } as Task;
    setLengthTask(lengthTask + 1);
    dispatch({
      type: 'CREATE_TASK',
      payload: [...dataBoard, newItem],
    });
    setDataBoard([...dataBoard, newItem]);

    localStorage.setItem(
      'dataBoardTask',
      JSON.stringify([...dataBoard, newItem]),
    );
  };
  return (
    <Box style={{ display: 'flex' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          style={{
            paddingTop: 64,
          }}
        >
          <Grid item xs={12}>
            <CardTaskButton onCreateCard={handleCreateTask} />
            <BoardTask
              key={lengthTask}
              initialTasks={dataBoard}
              tasks={dataBoard}
              setTasks={setDataBoard}
            />
            {children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export { HomeTask };
