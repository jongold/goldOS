import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM, SELECT_WINDOW, CLOSE_WINDOW } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS([
  { id: 1, title: 'Bookshelf', x: 300, y: 60 },
  { id: 2, title: 'Podcasts', x: 20, y: 60 },
  { id: 3, title: 'Welcome', x: 20, y: 360 }
]);

function formReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_WINDOW:
      return state.update('windows', (windows) => {
        const win = windows.find((w) => w.get('id') === action.data)
        return windows
          .filterNot((w) => w.get('id') === action.data)
          .push(win)
      })
    case CLOSE_WINDOW:
      return state.filterNot((w) => w.get('id') === action.data)
    default:
      return state;
  }
}

export default formReducer;
