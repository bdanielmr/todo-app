/* eslint-disable */
import React, {
  FC,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { CardItem } from '../CardItem';
import { Task } from '../../utils/types';

interface TaskProps {
  index: number;
  name?: string;
  task: Task;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragEnd: (e: React.DragEvent) => void;
  onDragOverTask?: (e: React.DragEvent, index: number) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  setTasks: (e: any) => void;
  tasks: Task[];
}

export const CardTask: FC<TaskProps> = ({
  index,
  name,
  task,
  onDragStart,
  onDragEnd,
  onDragOverTask,
  onDragLeave,
  tasks,
  setTasks,
}) => {
  const { dispatch, state } = useContext(StoreContext)!;
  const { dataBoardTask } = state;
  const [title, setTitle] = useState(name);
  const [description, setDescription] = useState('Descripción');
  const [finishTime, setFinishTime] = useState<number | null>(null);
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };
  const handlUpdateTime = (time: number) => {
    setFinishTime(time);
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        ...task,
        time: { ...task.time, currentTime: time },
      },
    });
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...tasks[taskIndex],
      time: { ...tasks[taskIndex].time, currentTime: time },
    };
    localStorage.setItem('dataBoardTask', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };
  const handleFinishTime = (time: number) => {
    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        ...task,
        column: 'Done',
        completed: true,
        time: {
          ...task.time,
          finishTime: time,
        },
      },
    });
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    const finishTasks = [...tasks];
    finishTasks[taskIndex] = {
      ...tasks[taskIndex],
      column: 'Done',
      completed: true,
      time: { ...tasks[taskIndex].time, finishTime: time },
    };
    localStorage.setItem('dataBoardTask', JSON.stringify(finishTasks));
    setTasks(finishTasks);
  };

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, index)}
      onDragEnd={e => onDragEnd(e)}
      onDragOver={e => onDragOverTask && onDragOverTask(e, index)}
      onDragLeave={e => onDragLeave && onDragLeave(e)}
      style={{
        backgroundColor: 'lightgrey',
        borderRadius: '3px',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'grab',
      }}
    >
      <CardItem
        key={task.id}
        id={task.id}
        title={title}
        description={description}
        onTitleChange={handleTitleChange}
        onDescriptionChange={handleDescriptionChange}
        initialTime={task.time?.initialTime ?? 30 * 60}
        currentTime={task.time?.currentTime}
        finishTime={task.time?.finishTime}
        onFinishTime={handleFinishTime}
        onTimerUpdate={handlUpdateTime}
      />
    </div>
  );
};
