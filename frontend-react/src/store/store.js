import React from "react";
import {
  AUTHENTICATE,
  GET_NOTES,
  ADD_NOTE
} from './constants';

export const Store = React.createContext("");

const initialState = {
  isAuthenticated: false,
  token: "",
  notes: []
}

function reducer(state, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        token: action.payload.token,
      }
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload.notes
      }
    case ADD_NOTE:
      return {
        ...state
      }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  );
};

