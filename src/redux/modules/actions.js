import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM, SELECT_WINDOW,
  OPEN_WINDOW, CLOSE_WINDOW, MOVE_WINDOW, LOAD_BOOKS } from './constants';
import ApiClient from 'helpers/ApiClient';

const client = new ApiClient();

export function selectPlaylistItem(data) {
  return {
    type: SELECT_PLAYLIST_ITEM,
    data,
  };
}

export function moveWindow(data) {
  return {
    type: MOVE_WINDOW,
    data,
  };
}

export function selectWindow(data) {
  return {
    type: SELECT_WINDOW,
    data,
  };
}

function _openWindow(data) {
  return {
    type: OPEN_WINDOW,
    data,
  }
}

export function openWindow(data) {
  return function (dispatch) {
    dispatch(_openWindow(data))

    if (data === 'Bookshelf') {
      return client.get('/books').then(
        data => dispatch(loadBooks(data))
      )
    }
  }
}

export function closeWindow(data) {
  return {
    type: CLOSE_WINDOW,
    data,
  };
}

export function loadBooks(books) {
  return {
    type: LOAD_BOOKS,
    data: books
  }
}

export function authenticationSuccessful(data) {
  return {
    type: AUTH_SUCCESS,
    data,
  };
}

export function authenticationFailed(errorMsg) {
  return {
    type: AUTH_ERROR,
    errorMsg,
  };
}
