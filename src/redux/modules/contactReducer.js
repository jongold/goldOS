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
      ],
    },
    { title: '#freelance',
      messages: [
        { text: 'Hey Jon! I’d like to pay you a bunch of money to make some internet for me.' },
        { text: 'Rad, I’m listening!', me: true },
        { text: 'Awesome!' },
        { text: 'What technologies do you use?' },
        { text: 'I’m currently really into React & Redux—this site: exhibit A—but I’m also happy to work with new, magical, inventions so long as they tend towards declarative, functional programming.', me: true },
        { text: 'So can you build us an app in Angular?' },
        { text: 'I’m washing my hair, sorry.', me: true },
        { text: 'Haha no problem, I get it!' },
        { text: 'And where are you based?' },
        { text: 'For freelance work I like the flexibility of remote, but I’d love to find a great full-time job in San Francisco or New York.', me: true },
      ],
    },
    { title: '#speaking',
      messages: [
        { text: 'I’d like you to speak at my conference.' },
        { text: 'fancy it?' },
        { text: 'I’d love to — I’m currently giving talks about the integration of design & AI, and of the lessons we can take from Functional Programming into CSS.', me: true },
        { text: '😍' },
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
