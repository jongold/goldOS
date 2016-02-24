import { createSelector } from 'reselect';
import { evolve, map } from 'ramda';
import moment from 'moment';

const momentify = evolve({
  date: moment,
});

const biosSelector = (state) => state.get('bios');
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
  biosSelector,
  bookSelector,
  podcastSelector,
  windowsSelector,
  habitsSelector,
  travelSelector,
  (bios, books, podcasts, windows, habits, travel) => {
    return ({ bios, books, podcasts, windows, habits, travel });
  }
);
