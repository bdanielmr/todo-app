/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { StoreContext } from '../store/StoreProvider';
import { StoreContextType, HomeType } from '../utils/types';

interface Task {
  id: number;
  name: string;
  column: string;
  title: string;
  description: string;
  completed: boolean;
  type: string;
  time: {
    initialTime: number;
    currentTime: number;
    finishTime: number;
  };
}

interface DoneTasksProps {
  storageKey: string;
}

const HistoryTasks: React.FC<DoneTasksProps> = ({
  storageKey = 'dataBoardTask',
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { state } = useContext<StoreContextType | null>(StoreContext) || {
    state: {
      dataBoardTask: [] as Task[],
      dataHome: [] as unknown as HomeType,
    },
  };
  const { dataHome }: { dataHome: HomeType } = state;
  useEffect(() => {
    const storedTasks = localStorage.getItem(storageKey);
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      setTasks(parsedTasks.filter(task => task.column === 'Done'));
    }
  }, [storageKey]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {dataHome.titleHeader}
          </Typography>

          {dataHome.sidebarItems.map(value => (
            <Link to={value.router ?? ''}>
              <Typography
                key={value.id}
                sx={{ marginLeft: 10 }}
                variant="h6"
                noWrap
              >
                {value.value}
              </Typography>
            </Link>
          ))}
        </Toolbar>
      </AppBar>
      <h2>Tareas completadas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export { HistoryTasks };
