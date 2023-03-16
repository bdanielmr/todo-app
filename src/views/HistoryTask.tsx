/* eslint-disable */
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const storedTasks = localStorage.getItem(storageKey);
    if (storedTasks) {
      const parsedTasks: Task[] = JSON.parse(storedTasks);
      setTasks(parsedTasks.filter(task => task.column === 'Done'));
    }
  }, [storageKey]);

  return (
    <div>
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
