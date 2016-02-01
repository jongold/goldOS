import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM } from './constants';

export function selectPlaylistItem (data) {
  return {
    type: SELECT_PLAYLIST_ITEM,
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
