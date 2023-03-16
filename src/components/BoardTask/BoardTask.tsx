/* eslint-disable */
import React, { useState, FC, Dispatch, SetStateAction } from 'react';
import { Grid } from '@mui/material';
import { StoreContext } from '../../store/StoreProvider';
import { CardTask } from '../CardTask';
import { ColumnTask } from '../ColumnTask';
import { Task } from '../../utils/types';

interface BoardTaskProps {
  initialTasks: Task[];
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const BoardTask: FC<BoardTaskProps> = ({ initialTasks, tasks, setTasks }) => {
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const onDragOverTask = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOverIndex(null);
  };

  const onDrop = (e: React.DragEvent, columnName: string) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    const sourceTask = tasks[sourceIndex];
    const updatedTasks = tasks.filter((_, index) => index !== sourceIndex);

    const targetIndex = (() => {
      if (draggedOverIndex === null) {
        const targetColumnTasks = updatedTasks.filter(
          task => task.column === columnName,
        );
        const columnEmpty = targetColumnTasks.length === 0;
        const lastTaskInTargetColumn = updatedTasks
          .slice()
          .reverse()
          .find(task => task.column === columnName);

        return columnEmpty
          ? updatedTasks.length
          : updatedTasks.indexOf(lastTaskInTargetColumn!) + 1;
      }
      return draggedOverIndex + (sourceIndex < draggedOverIndex ? 1 : 0);
    })();

    updatedTasks.splice(targetIndex, 0, { ...sourceTask, column: columnName });
    console.log('updatedTasksupdatedTasks', updatedTasks);
    localStorage.setItem('dataBoardTask', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setDraggedOverIndex(null);
  };

  return (
    <Grid container spacing={2}>
      {['Stories', 'Progress', 'Done'].map(column => (
        <Grid item xs={12} sm={6} md={4} key={column}>
          <ColumnTask
            key={column}
            title={column}
            onDrop={e => onDrop(e, column)}
            onDragOver={e => e.preventDefault()}
          >
            {tasks
              .filter(task => task.column === column)
              .map(task => (
                <CardTask
                  key={task.id}
                  index={tasks.indexOf(task)}
                  task={task}
                  name={task.name}
                  onDragStart={onDragStart}
                  onDragEnd={e => e.preventDefault()}
                  onDragOverTask={onDragOverTask}
                  onDragLeave={onDragLeave}
                  setTasks={setTasks}
                  tasks={tasks as Task[]}
                />
              ))}
          </ColumnTask>
        </Grid>
      ))}
    </Grid>
  );
};

export { BoardTask };
