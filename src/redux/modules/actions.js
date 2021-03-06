import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM, SELECT_WINDOW,
  OPEN_WINDOW, CLOSE_WINDOW, MOVE_WINDOW } from './constants';

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

export function openWindow(data) {
  return {
    type: OPEN_WINDOW,
    data,
  };
}

export function closeWindow(data) {
  return {
    type: CLOSE_WINDOW,
    data,
  };
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
