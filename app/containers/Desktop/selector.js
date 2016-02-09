import { createSelector } from 'reselect';
import { evolve, map } from 'ramda';
import moment from 'moment';

const momentify = evolve({
  date: moment,
});

const bookSelector = (state) => state.get('books');
const podcastSelector = (state) => state.get('podcasts');
const windowsSelector = (state) => state.get('windows');
const travelSelector = (state) => state.get('travel');

const habitsSelector = createSelector(
  (state) => state.getIn(['habits']),
  (habits) => {
    return map(momentify, habits.toJS());
  }
);

export default createSelector(
  bookSelector,
  podcastSelector,
  windowsSelector,
  habitsSelector,
  travelSelector,
  (books, podcasts, windows, habits, travel) => {
    return ({ books, podcasts, windows, habits, travel });
  }
);
