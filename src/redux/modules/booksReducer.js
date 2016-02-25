import { fromJS } from 'immutable';

const initialState = fromJS([
  { title: 'The War of Art' },
  { title: 'Turning Pro' },
  { title: 'Mindfulness in Plain English' },
  { title: 'On The Road' },
  { title: 'Vagabonding' },
  { title: 'The Artist\'s Way' },
  { title: 'Big Magic' },
  { title: 'Deep Work' },
  { title: 'Act Accordingly' },
  { title: 'Get Some Headspace' },
  { title: '10% Happier' },
  { title: 'Hardcore Zen' },
  { title: 'Meditations' },
  { title: 'Be Here Now' },
  { title: 'Waking Up' },
]);

export default function booksReducer(state = initialState) {
  return state;
}
