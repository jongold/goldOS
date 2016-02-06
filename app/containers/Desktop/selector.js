import { createSelector } from 'reselect';
import { evolve, map } from 'ramda'
import moment from 'moment'

const momentify = evolve({
  date: moment
})

const bookSelector    = (state) => state.get('books')
const podcastSelector = (state) => state.get('podcasts')
const windowsSelector = (state) => state.get('windows')

const habitsSelector  = createSelector(
  (state) => state.getIn(['habits']),
  (habits) => {
    return map(momentify, habits.toJS())
  }
)

export default createSelector(
  bookSelector,
  podcastSelector,
  windowsSelector,
  habitsSelector,
  (books, podcasts, windows, habits) => {
    return ({ books, podcasts, windows, habits })
  }
);
