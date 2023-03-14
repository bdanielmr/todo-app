import React, { createContext, useReducer, useMemo } from 'react';
import storeReducer, { initialStore } from './storeReducer';

interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreContext = createContext({});

function StoreProvider({ children }: StoreProviderProps) {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  const contextValue = useMemo(() => [store, dispatch], [store, dispatch]);
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext };
export default StoreProvider;
