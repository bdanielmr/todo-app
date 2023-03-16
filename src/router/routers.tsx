import React from 'react';
import { HistoryTasks } from '../views/HistoryTask';
import { HomeTask } from '../views/HomeTask';

export type RoutesTypes = {
  name: string;
  url: string;
  path: string;
  component: React.ComponentType<any>;
  exact: boolean;
};
export const routes: RoutesTypes[] = [
  {
    name: 'Home',
    url: '/',
    path: '/',
    component: HomeTask,
    exact: true,
  },
  {
    name: 'historyTask',
    url: '/history-task',
    path: '/history-task',
    component: HistoryTasks,
    exact: true,
  },
];
