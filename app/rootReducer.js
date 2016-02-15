/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { routeReducer } from 'react-router-redux';
import globalReducer from 'App/reducer';
import booksReducer from 'App/booksReducer';
import habitsReducer from 'App/habitsReducer';
import podcastsReducer from 'App/podcastsReducer';
import travelReducer from 'App/travelReducer';

export default combineReducers({
  route: routeReducer,
  windows: globalReducer,
  books: booksReducer,
  habits: habitsReducer,
  podcasts: podcastsReducer,
  travel: travelReducer,
});