import { SELECT_WINDOW, OPEN_WINDOW, CLOSE_WINDOW, MOVE_WINDOW } from './constants';
import { compose, max } from 'ramda';
import { Map, OrderedMap } from 'immutable';

const initialState = new OrderedMap({
  0: Map({ title: 'Welcome', x: 20, y: 60 }),
});

function round(n) {
  return (Math.round(n / 20) * 20);
}

const roundX = compose(
  max(20),
  round
);

const roundY = compose(
  max(60),
  round
);

function formReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_WINDOW: {
      const isOpen = state.findEntry((w) => w.get('title') === action.data);
      if (isOpen) {
        const [k, v] = isOpen;
        return state.withMutations(s => s.delete(k).set(k, v));
      }

      const id = state.size;
      const lastItem = state.last();
      const item = new Map({
        x: lastItem ? lastItem.get('x') + 38 : 40,
        y: lastItem ? lastItem.get('y') + 38 : 40,
        title: action.data,
      });

      return state.set(id, item);
    }

    case SELECT_WINDOW: {
      const id = action.data;
      const win = state.get(id);

      return state.withMutations(s => s.delete(id).set(id, win));
    }

    case CLOSE_WINDOW: {
      return state.delete(action.data);
    }

    case MOVE_WINDOW: {
      const { id, x, y } = action.data;
      const newWin = state.get(id).merge({ x: roundX(x), y: roundY(y) });

      return state.withMutations(s => s.delete(id).set(id, newWin));
    }

    default: {
      return state;
    }
  }
}

export default formReducer;
