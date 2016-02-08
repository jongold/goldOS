import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM, SELECT_WINDOW, CLOSE_WINDOW, MOVE_WINDOW } from './constants';
import { compose, max } from 'ramda'
import { fromJS } from 'immutable'

const initialState = fromJS([
  { id: 1, title: 'Bookshelf', x: 300, y: 60 },
  { id: 2, title: 'Podcasts', x: 20, y: 60 },
  { id: 3, title: 'Welcome', x: 20, y: 360 }
]);

const round = n => (Math.round(n / 20) * 20)

const roundX = compose(
  max(20),
  round
)

const roundY = compose(
  max(60),
  round
)

function formReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_WINDOW:
      const win = state.find((w) => w.get('id') === action.data)

      return state.filterNot((w) => w.get('id') === action.data)
                  .push(win)

    case CLOSE_WINDOW:
      return state.filterNot((w) => w.get('id') === action.data)

    case MOVE_WINDOW:
      const { id, x, y } = action.data

      const newWin = state.find((w) => w.get('id') === id)
                          .set('x', roundX(x))
                          .set('y', roundY(y))

      const newState = state.filterNot((w) => w.get('id') === id)
                            .push(newWin)
      return newState

    default:
      return state;

  }
}

export default formReducer;
