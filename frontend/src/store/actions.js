import AuthApi from '../api/authentication';
import NotesApi from '../api/notes';
import { AUTHENTICATE, GET_NOTES, ADD_NOTE, DELETE_NOTE } from './constants';

export const authenticate = async (username, password, dispatch) => {
  let response = await AuthApi.authenticate(username, password);
  return dispatch({
    type: AUTHENTICATE,
    payload: {
      isAuthenticated: response.success,
      token: response.token,
    }
  })
}

export const getNotes = async (token, dispatch) => {
  let response = await NotesApi.notes(token); 
  return dispatch({
    type: GET_NOTES,
    payload: {
      notes: response.notes
    }
  })
}

export const addNote = async (token, title, content, dispatch) => {
  let response = await NotesApi.addNote(token, title, content);
  return dispatch({
    type: ADD_NOTE,
    payload: {
      success: response.success,
      message: response.message
    }
  })
}

export const deleteNote = async (token, id, dispatch) => {
  let response = await NotesApi.deleteNote(token, id);
  return dispatch({
    type: DELETE_NOTE,
    payload: {
      success: response.success,
      message: response.message
    }
  })
}