/* eslint-disable */
import { AppState, ActionState } from '../utils/types';

const types = {
  getDataBoardTask: 'GET-DATA-BOAR-TASK',
  getDataHome: 'GET-DATA-HOME',
  createTask: 'CREATE-TASK',
  updateTask: 'UPDATE_TASK',
};

const initialStore: AppState = {
  dataBoardTask:
    JSON.parse(localStorage.getItem('dataBoardTask') || '[]').length > 0
      ? JSON.parse(localStorage.getItem('dataBoardTask') || '[]')
      : [
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
        ],
  dataHome: {
    titleHeader: 'Todo App',
    sidebarItems: [
      {
        id: 'Home',
        label: 'Home',
        value: 'Home',
        router: '/',
      },
      {
        id: 'Task History',
        label: 'Task History',
        value: 'Task History',
        router: '/history-task',
      },
    ],
  },
};

const storeReducer = (state: AppState, action: ActionState) => {
  switch (action.type) {
    case types.getDataBoardTask:
      return {
        ...state,
        dataBoardTask: action.payload,
      };
    case types.getDataHome:
      return {
        ...state,
        dataHome: action.payload,
      };
    case types.updateTask:
      return {
        ...state,
        dataBoardTask: state.dataBoardTask.map(task =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case types.createTask:
      return {
        ...state,
        dataBoardTask: action.payload,
      };
    default:
      return state;
  }
};

export { initialStore, types };
export default storeReducer;
