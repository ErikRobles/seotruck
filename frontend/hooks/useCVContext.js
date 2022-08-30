import { CVContext } from '../context/CVContext';
import { useContext } from 'react';

export const useCVContext = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCVContext must be used within CVContextProvider');
  }
  return context;
};
