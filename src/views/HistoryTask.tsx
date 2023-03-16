/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Task } from '../utils/types';

interface DoneTasksProps {
  storageKey: string;
}

const HistoryTasks: React.FC<DoneTasksProps> = ({
  storageKey = 'dataBoardTask',
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(storageKey);
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      setTasks(parsedTasks.filter(task => task.column === 'Done'));
    }
  }, [storageKey]);

  return (
    <div>
      <Typography variant="h4" component="div" gutterBottom>
        Tareas completadas
      </Typography>
      <Grid container spacing={2}>
        {tasks.map(task => (
          <Grid sx={{ marginTop: 10 }} item key={task.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                minWidth: 275,
                boxShadow: 3,
                borderRadius: 2,
                p: 1,
              }}
            >
              <CardHeader title={task.name} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {task.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export { HistoryTasks };
