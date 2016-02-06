import { AUTH_SUCCESS, AUTH_ERROR, SELECT_PLAYLIST_ITEM, SELECT_WINDOW, CLOSE_WINDOW } from './constants';
import { fromJS } from 'immutable';

const initialState = fromJS({
  authenticated: false,
  userData: {},
  windows: [
    { id: 1, title: 'Bookshelf', x: 300, y: 60 },
    { id: 2, title: 'Podcasts', x: 20, y: 60 },
    { id: 3, title: 'Welcome', x: 20, y: 360 }
  ],
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
  habits: [
    {
      date: '2016-01-01',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-02',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-03',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-04',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-05',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-06',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-07',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-08',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-09',
      'meditate': false,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-10',
      'meditate': false,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-11',
      'meditate': false,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-12',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-13',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-14',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-15',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-16',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-17',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-18',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-19',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-20',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-21',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-22',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-23',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-24',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-25',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-26',
      'meditate': true,
      'no alcohol': true,
      'reading': true
    },
    {
      date: '2016-01-27',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-28',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-29',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-30',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-01-31',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-02-01',
      'meditate': false,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-02-02',
      'meditate': false,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-02-03',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-02-04',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    },
    {
      date: '2016-02-05',
      'meditate': true,
      'no alcohol': true,
      'reading': false
    }
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
    case SELECT_WINDOW:
      return state.update('windows', (windows) => {
        const win = windows.find((w) => w.get('id') === action.data)
        return windows
          .filterNot((w) => w.get('id') === action.data)
          .push(win)
      })
    case CLOSE_WINDOW:
      return state.update('windows', (windows) => windows.filterNot((w) => w.get('id') === action.data))
    default:
      return state;
  }
}

export default formReducer;
