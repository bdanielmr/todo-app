/* eslint-disable */
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
Box;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

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

interface TaskHistoryChartProps {
  localStorageKey: string;
}

const ChartTask: React.FC<TaskHistoryChartProps> = ({
  localStorageKey = 'dataBoardTask',
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem(localStorageKey);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [localStorageKey]);

  const data = tasks.map(task => ({
    name: task.name,
    initialTime: task.time.initialTime,
    currentTime: task.time.currentTime,
    finishTime: task.time.finishTime,
  }));

  return (
    <Box sx={{ paddingTop: 24 }}>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="initialTime" fill="#8884d8" />
        <Bar dataKey="currentTime" fill="#82ca9d" />
        <Bar dataKey="finishTime" fill="#ffc658" />
      </BarChart>
    </Box>
  );
};

export { ChartTask };
