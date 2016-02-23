import { fromJS } from 'immutable';
import { LOAD_BOOKS } from './constants';

const initialState = fromJS({
  loaded: false,
  books: []
})

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_BOOKS: {
      return state.withMutations(map => {
        return map.set('loaded', true).set('books', fromJS(action.data))
      })
    }

    default: {
      return state;
    }
  }
}
