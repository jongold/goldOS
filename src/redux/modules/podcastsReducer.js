import { fromJS } from 'immutable';
import { SELECT_PLAYLIST_ITEM } from './constants';

const initialState = fromJS({
  current: 'Design Details #114',
  library: [
    { title: 'Does Not Compute #25', url: 'https://soundcloud.com/goldos/25-falling-with-style-feat-jon-gold', date: '29th March 2016' },
    { title: 'Design Details #114', url: 'https://soundcloud.com/goldos/114-coffee-road-show-feat-linda-eliasen-jon-gold', date: '21st March 2016' },
    { title: 'Design Details #43', url: 'https://soundcloud.com/designdetailsfm/43-freedom-juice-feat-jon-gold', date: '15th July 2015' },
    { title: 'Hack To Start', url: 'https://soundcloud.com/hacktostart/hacktostart-episode-64-jon-gold-designer-the-grid', date: '29th Sep 2015' },
    { title: 'The Start' },
    { title: 'Upfront' },
  ],
});

export default function postcastsReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_PLAYLIST_ITEM:
      return state.set('current', action.data);
    default:
      return state;
  }
}
