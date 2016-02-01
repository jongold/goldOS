import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM, CLOSE_WINDOW } from './constants';

export function selectPlaylistItem (data) {
  return {
    type: SELECT_PLAYLIST_ITEM,
    data
  }
}

export function closeWindow (data) {
  return {
    type: CLOSE_WINDOW,
    data
  }
}

export function authenticationSuccessful(data) {
  return {
    type: AUTH_SUCCESS,
    data
  };
}

export function authenticationFailed(errorMsg) {
  return {
    type: AUTH_ERROR,
    errorMsg
  };
}
