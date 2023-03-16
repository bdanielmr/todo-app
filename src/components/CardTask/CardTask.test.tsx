/* eslint-disable */
import React from 'react';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CardTask } from './CardTask';
import { StoreContext } from '../../store/StoreProvider';
import { Task, AppState } from '../../utils/types';

const task: Task = {
  id: 1,
  name: 'Test task',
  title: 'Test title',
  description: 'Test description',
  column: 'Done',
  completed: false,
  time: {
    initialTime: 1800,
    currentTime: 1800,
    finishTime: 0,
  },
  type: 'todos',
};

const dispatch = jest.fn();
const state: AppState = {
  dataBoardTask: [task],
  dataHome: {
    titleHeader: '',
    sidebarItems: [],
  },
};

const onDragStart = jest.fn();
const onDragEnd = jest.fn();
const onDragOverTask = jest.fn();
const onDragLeave = jest.fn();

const setTasks = jest.fn();
const tasks = [task];

test('CardTask renders correctly', () => {
  const { getByText } = render(
    <StoreContext.Provider value={{ dispatch, state }}>
      <CardTask
        index={0}
        task={task}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOverTask={onDragOverTask}
        onDragLeave={onDragLeave}
        setTasks={setTasks}
        tasks={tasks}
      />
    </StoreContext.Provider>,
  );

  expect(getByText('Descripción')).toBeInTheDocument();
});
