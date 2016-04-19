import { fromJS } from 'immutable';

const initialState = fromJS([
  { title: 'Mastery', url: 'https://www.goodreads.com/book/show/13589182-mastery' },
  { title: 'The Media Lab', url: 'https://www.goodreads.com/book/show/38276.The_Media_Lab' },
  { title: 'The Dream Machine', url: 'https://www.goodreads.com/book/show/722412.The_Dream_Machine' },
  { title: 'Gödel, Escher, Bach', url: 'https://www.goodreads.com/book/show/24113.G_del_Escher_Bach' },
  { title: 'The War of Art', url: 'https://www.goodreads.com/book/show/1319.The_War_of_Art' },
  { title: 'Turning Pro', url: 'https://www.goodreads.com/book/show/14912777-turning-pro' },
  { title: 'Mindfulness in Plain English', url: 'https://www.goodreads.com/book/show/24380850-mindfulness-in-plain-english' },
  { title: 'On The Road', url: 'https://www.goodreads.com/book/show/70401.On_the_Road' },
  { title: 'Vagabonding', url: 'https://www.goodreads.com/book/show/100247.Vagabonding' },
  { title: 'The Artist\'s Way', url: 'https://www.goodreads.com/book/show/615570.The_Artist_s_Way' },
  { title: 'Big Magic', url: 'https://www.goodreads.com/book/show/24487482-big-magic' },
  { title: 'Deep Work', url: 'https://www.goodreads.com/book/show/25744928-deep-work' },
  { title: 'Act Accordingly', url: 'https://www.goodreads.com/book/show/18125396-act-accordingly' },
  { title: 'Get Some Headspace', url: 'https://www.goodreads.com/book/show/13167215-get-some-headspace' },
  { title: '10% Happier', url: 'https://www.goodreads.com/book/show/18655906-10-happier' },
  { title: 'Hardcore Zen', url: 'https://www.goodreads.com/book/show/8875385-hardcore-zen' },
  { title: 'Meditations', url: 'https://www.goodreads.com/book/show/7804095-meditations' },
  { title: 'Be Here Now', url: 'https://www.goodreads.com/book/show/29254.Be_Here_Now' },
  { title: 'Waking Up', url: 'https://www.goodreads.com/book/show/18774981-waking-up' },
]);

export default function booksReducer(state = initialState) {
  return state;
}
