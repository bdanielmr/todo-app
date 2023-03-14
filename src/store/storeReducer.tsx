import { AppState, ActionState } from '../utils/types';

const types = {
  getDataBoardTask: 'GET-DATA-BOAR-TASK',
};

const initialStore = {
  dataBoardTask: [],
};

const storeReducer = (state: AppState, action: ActionState) => {
  switch (action.type) {
    case types.getDataBoardTask:
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
