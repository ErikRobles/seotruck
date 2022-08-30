import { createContext, useReducer, useEffect } from 'react';

export const CVContext = createContext();

export const cvReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CVS':
      return {
        ...state,
        cvs: action.payload,
        loading: false,
      };
    case 'DELETE_CV':
      return {
        cvs: state.cvs.filter((cv) => cv._id !== action.payload),
      };
    default:
      return state;
  }
};

export const CVContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cvReducer, {
    cvs: null,
  });

  console.log('CV Context State: ', state);

  return (
    <CVContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
};
