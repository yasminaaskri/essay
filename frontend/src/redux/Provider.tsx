// CustomProvider.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './Store';

interface CustomProviderProps {
  children: React.ReactNode;
}

const CustomProvider: React.FC<CustomProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default CustomProvider;
