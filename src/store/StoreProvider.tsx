/* eslint-disable */
import React, { createContext, useReducer, useMemo, useEffect } from 'react';
import storeReducer, { initialStore } from './storeReducer';
import { AppState, ActionState, StoreContextType } from '../utils/types';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreContext = createContext<StoreContextType | null>(null);

function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(storeReducer, initialStore);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext };
export default StoreProvider;
