import { fromJS } from 'immutable'

export default function booksReducer (state = initialState) {
  return state
}

const initialState = fromJS([
  { title: 'Mindfulness in Plain English' },
  { title: 'The Artist\'s Way' },
  { title: 'Big Magic' },
  { title: 'Deep Work' },
  { title: 'Act Accordingly' },
  { title: 'Get Some Headspace' },
  { title: '10% Happier' },
  { title: 'Hardcore Zen' }
])
