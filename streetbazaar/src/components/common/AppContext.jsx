import React, { createContext, useContext } from 'react';

// Context for app state
const AppContext = createContext();

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export { AppContext, useAppContext };