export type TimeTask = {
  initialTime: number;
  currentTime: number;
  finishTime: number;
};

export type Task = {
  id: number;
  title: string;
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
}
