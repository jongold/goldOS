import { fromJS } from 'immutable';

const CHANGE_THREAD = 'CHANGE_THREAD';

export function changeThread(to) {
  // TODO: change route too
  return {
    type: CHANGE_THREAD,
    data: to,
  };
}

const initialState = fromJS({
  activeThread: '#freelance',
  threads: [
    { title: '#fulltime',
      messages: [
        { text: '😍' },
        { text: '😍', me: true },
        { text: 'So we’re hiring for our design systems / design tooling / prototyping team and we thought you’d be a great fit…' },
        { text: 'tell me more!', me: true },
        { text: 'well, we’re a diverse, well-funded team in London, Berlin, San Francisco or Portland working on something interesting.' },
        { text: 'our design team is full of weird hybrids like you, too!' },
        { text: 'sounds awesome. if you’re in the US, can you sponsor visas?', me: true },
        { text: 'yup! want to chat more?' },
        { text: 'I’d love to. Want to drop me an email? <a href="mailto:hire@jon.gold?subject=Let’s talk about us & you…">hire@jon.gold</a>.', me: true },
      ],
    },
    { title: '#freelance',
      messages: [
        { text: 'Hey Jon, nice beard! We’d like to pay you money to make some internet.' },
        { text: 'Rad, I’m listening!', me: true },
        { text: 'Awesome! So you’re a designer?' },
        { text: 'Yup! I can do everything from UX to visual design; tending to be happiest in fast-moving product design roles.', me: true },
        { text: 'And code? What technologies do you use?' },
        { text: 'As of 2016 I’m very happy & productive with React. I can also work on projects in Meteor and Ember. I’m not taking on backend projects, or any WordPress / Angular at the moment. ', me: true },
        { text: 'Do you do design or development in isolation?' },
        { text: 'If the project is <span class=italic>amazing</span>; but you get the most @jongold for your money if I’m simulatenously involved with design and build.', me: true },
        { text: 'Cool, when are you available?' },
        { text: 'I’m free from the beginning of April, for projects of a month or longer.', me: true },
        { text: 'Wonderful. Want to #touchbase and hear more?' },
        { text: 'I’d love to. Drop me an email: <a href="mailto:hire@jon.gold?subject=Let’s talk about us & you…">hire@jon.gold</a>.', me: true },
      ],
    },
    { title: '#speaking',
      messages: [
        { text: 'we’d like you to speak at our conference!' },
        { text: 'fancy it?' },
        { text: 'I’d love to — I’m currently giving talks about the integration of design & AI, and of the lessons we can take from Functional Programming into CSS.', me: true },
        { text: '💗' },
        { text: 'Pretty standard stuff though; I need flights paid for, and you absolutely need to have a Code of Conduct and a diverse speaker lineup.', me: true },
        { text: 'Drop me a line - <a href="mailto:speaking@jon.gold">speaking@jon.gold</a>', me: true },
      ],
    },
    { title: '#mentoring',
      messages: [
        { text: 'I have questions about design / code / life; do you mind if I email you for advice? 🙏' },
        { img: '/fursure.gif', me: true },
        { text: 'hit me at <a href="mailto:mentoring@jon.gold">mentoring@jon.gold</a>', me: true },
      ],
    },
  ],
});

function contactReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THREAD: {
      return state.set('activeThread', action.data);
    }
    default:
      return state;
  }
}

export default contactReducer;
