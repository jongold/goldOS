import { SELECT_WINDOW, OPEN_WINDOW, CLOSE_WINDOW, MOVE_WINDOW } from './constants';
import { compose, max } from 'ramda';
import { fromJS, Map, OrderedSet } from 'immutable';

const initialState = OrderedSet.of(
  Map({ id: 0, title: 'Welcome', x: 20, y: 60 }),
);

const round = n => (Math.round(n / 20) * 20);

const roundX = compose(
  max(20),
  round
);

const roundY = compose(
  max(60),
  round
);

function formReducer(state = initialState, action) {
  let win;
  switch (action.type) {
    case OPEN_WINDOW:
      const foo = state.find((w) => w.get('title') === action.data);
      if (foo) {
        return state.delete(foo).add(foo);
      }
      const lastItem = state.last();
      const item = fromJS({
        id: state.size,
        x: lastItem ? lastItem.get('x') + 38 : 40,
        y: lastItem ? lastItem.get('y') + 38 : 40,
        title: action.data,
      });

      return state.add(item);

    case SELECT_WINDOW:
      win = state.find((w) => w.get('id') === action.data);

      return state.delete(win)
                  .add(win);

    case CLOSE_WINDOW:
      win = state.find((w) => w.get('id') === action.data);

      return state.delete(win);

    case MOVE_WINDOW:
      const { id, x, y } = action.data;

      win = state.find((w) => w.get('id') === id);
      const newWin = win.set('x', roundX(x))
        .set('y', roundY(y));

      const newState = state.delete(win)
                            .add(newWin);
      return newState;

    default:
      return state;

  }
}

export default formReducer;
