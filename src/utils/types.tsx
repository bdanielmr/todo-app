/* eslint-disable */
export type ItemSidebar = {
  id: string;
  label: string;
  value: string;
};

export type TimeTask = {
  initialTime: number;
  currentTime: number;
  finishTime: number;
};

export type HomeType = {
  titleHeader: string;
  sidebarItems: ItemSidebar[];
};

export type Task = {
  id: number;
  title: string;
  name?: string;
  column?: string;
  description: string;
  completed: boolean;
  type: 'todos' | 'corto' | 'medio' | 'largo';
  time: TimeTask;
};

export interface ActionState {
  type: string;
  payload?: any;
}

export interface AppState {
  dataBoardTask: Task[];
  dataHome: HomeType;
}

export interface StoreContextType {
  state: AppState;
  dispatch: (action: ActionState) => void;
}
