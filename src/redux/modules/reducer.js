import { combineReducers } from 'redux-immutable';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';


import biosReducer from './biosReducer';
import contactReducer from './contactReducer';
import globalReducer from './windowsReducer';
import booksReducer from './booksReducer';
import habitsReducer from './habitsReducer';
import podcastsReducer from './podcastsReducer';
import travelReducer from './travelReducer';
import { fromJS } from 'immutable';

import { UPDATE_LOCATION } from 'react-router-redux';

let initialState;

initialState = fromJS({
  location: undefined,
});

function routeReducer(state = initialState, action) {
  if (action.type === UPDATE_LOCATION) {
    return state.merge({
      location: action.payload,
    });
  }

  return state;
}

export default combineReducers({
  route: routeReducer,
  reduxAsyncConnect,
  windows: globalReducer,
  bios: biosReducer,
  books: booksReducer,
  contact: contactReducer,
  habits: habitsReducer,
  podcasts: podcastsReducer,
  travel: travelReducer,
  // auth,
  // form,
  // multireducer: multireducer({
  //   counter1: counter,
  //   counter2: counter,
  //   counter3: counter
  // }),
  // info,
  // widgets
});
