/* eslint-disable */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BoardTask } from './BoardTask';
import { Task } from '../../utils/types';
import StoreProvider from '../../store/StoreProvider';

const mockTasks: Task[] = [
  {
    id: 1,
    name: 'task 1',
    column: 'Done',
    title: 'new title',
    description: 'task description',
    completed: true,
    type: 'todos',
    time: {
      initialTime: 0,
      currentTime: 120,
      finishTime: 120,
    },
  },
  {
    id: 2,
    name: 'task 2',
    column: 'Stories',
    title: 'new title',
    description: 'new desxcription',
    completed: false,
    type: 'todos',
    time: {
      initialTime: 1200,
      currentTime: 0,
      finishTime: 0,
    },
  },
  {
    id: 3,
    name: 'task 3',
    column: 'Stories',
    title: 'new title',
    description: 'new desxcription',
    completed: false,
    type: 'todos',
    time: {
      initialTime: 600,
      currentTime: 0,
      finishTime: 0,
    },
  },
];

describe('BoardTask', () => {
  test('renders column titles', () => {
    const { getByText } = render(
      <StoreProvider>
        <BoardTask
          initialTasks={mockTasks}
          tasks={mockTasks}
          setTasks={() => {}}
        />
      </StoreProvider>,
    );

    expect(getByText('Stories')).toBeInTheDocument();
    expect(getByText('Progress')).toBeInTheDocument();
    expect(getByText('Done')).toBeInTheDocument();
  });

  test('renders tasks in correct columns', () => {
    const { getByText } = render(
      <StoreProvider>
        <BoardTask
          initialTasks={mockTasks}
          tasks={mockTasks}
          setTasks={() => {}}
        />
      </StoreProvider>,
    );

    expect(getByText('task 1')).toBeInTheDocument();
    expect(getByText('task 2')).toBeInTheDocument();
    expect(getByText('task 3')).toBeInTheDocument();
  });
});
