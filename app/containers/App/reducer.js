import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  authenticated: false,
  userData: {},
  windows: [],
  books: [
    { title: 'Mindfulness in Plain English' },
    { title: 'The Artist\'s Way' },
    { title: 'Big Magic' },
    { title: 'Deep Work' },
    { title: 'Act Accordingly' },
    { title: 'Get Some Headspace' },
    { title: '10% Happier' },
    { title: 'Hardcore Zen' }
  ],
  podcasts: {
    current: 'Design Details #43',
    library: [
      // { title: 'Does Not Compute' },
      // { title: 'On The Grid' },
      { title: 'Design Details #43', url: 'https://soundcloud.com/designdetailsfm/43-freedom-juice-feat-jon-gold', date: '15th July 2015' },
      { title: 'Hack To Start', url: 'https://soundcloud.com/hacktostart/hacktostart-episode-64-jon-gold-designer-the-grid', date: '29th Sep 2015' },
      { title: 'The Start' },
      { title: 'Upfront' }
    ]
  }
});

function formReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      console.log('reducer success');
      return state.set('authenticated', true).set('userData', action.data);
    case AUTH_ERROR:
      return state.set('authenticated', false);
    case SELECT_PLAYLIST_ITEM:
      return state.setIn(['podcasts', 'current'], action.data)
    default:
      return state;
  }
}

export default formReducer;
