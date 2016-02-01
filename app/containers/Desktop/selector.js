import { createSelector } from 'reselect';

const globalSelector = (state) => state.get('global');

const bookSelector = (state) => state.getIn(['global', 'books']);
const podcastSelector = (state) => state.getIn(['global', 'podcasts']);
const windowsSelector = (state) => state.getIn(['global', 'windows']);

const authenticationSelector = createSelector(
  globalSelector,
  (globalState) => globalState.get('authenticated')
);

const userDataSelector = createSelector(
  globalSelector,
  (globalState) => globalState.get('userData')
);

export default createSelector(
  bookSelector,
  podcastSelector,
  windowsSelector,
  (books, podcasts, windows) => {
    return ({ books, podcasts, windows })
  }
);
