import { fromJS } from 'immutable'
import { SELECT_PLAYLIST_ITEM } from './constants';

export default function postcastsReducer (state = initialState, action) {
  switch (action.type) {
    case SELECT_PLAYLIST_ITEM:
      return state.setIn(['podcasts', 'current'], action.data)
    default:
      return state
  }
}

const initialState = fromJS({
  current: 'Design Details #43',
  library: [
    { title: 'Design Details #43', url: 'https://soundcloud.com/designdetailsfm/43-freedom-juice-feat-jon-gold', date: '15th July 2015' },
    { title: 'Hack To Start', url: 'https://soundcloud.com/hacktostart/hacktostart-episode-64-jon-gold-designer-the-grid', date: '29th Sep 2015' },
    { title: 'The Start' },
    { title: 'Upfront' }
  ]
})
