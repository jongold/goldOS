import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Window from 'components/Window';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { always, append, compose, curry, either, find, head, identity, join,
  last, pluck, prop, propEq, split, take } from 'ramda';

const words = curry((n, str) => {
  return compose(
    join(' '),
    append('…'),
    take(n),
    split(' ')
  )(str);
});

const excerpt = compose(
  words(10),
  either(identity, always('')),
  head,
  pluck('text')
);

function Thread({ title, active, messages }) {
  const cx = classNames('px2', 'py1', 'h6', 'border-bottom', 'border-gold', {
    'bg-white': !active,
    gold: !active,
    'bg-gold': active,
    white: active,
  });

  return (
    <li className={cx}>
      <h5>{title}</h5>
      <p className="italic">{ excerpt(messages) }</p>
    </li>
  );
}

function Bubble({ text, primary }) {
  const cx = classNames('p1', 'h6', 'mb1', 'rounded-2', 'border', 'border-gold', {
    'bg-white': primary,
    gold: primary,
    'bg-gold': !primary,
    white: !primary,
  });

  return (
    <li style={{ maxWidth: 300, alignSelf: primary ? 'flex-start' : 'flex-end' }} className={cx}>{text}</li>
  );
}

@immutableRenderDecorator
class Contact extends Component {
  render() {
    console.log('render post');
    const activeThread = '#speaking';
    const threads = [
      { title: '#speaking',
        messages: [
          { text: 'I’d like you to speak at my conference.' },
          { text: 'fancy it?' },
          { text: 'I’d love to — I’m currently giving talks about the integration of design & AI, and of the lessons we can take from Functional Programming into CSS.', me: true },
          { text: '😍' },
          { text: 'Pretty standard stuff though; I need flights paid for, and you absolutely need to have a Code of Conduct and a diverse speaker lineup.', me: true },
        ],
      },
      { title: '#fulltime',
        messages: [],
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
      { title: '#mentoring',
        messages: [
          { text: 'I have questions about design / code / life; do you mind if I email you for advice?' },
          { text: 'fur sure!', me: true },
        ],
      },
      { title: '#NFL',
        messages: [
          { text: 'What did you think of the 2015-16 49ers?' },
        ],
      },
    ];

    return (
      <Window {...this.props}>
        <div className="flex flex-grow">
          <ul className="flex flex-column list-reset border-right border-gold m0" style={{ maxWidth: 250 }}>
            {threads.map((t, i) => {
              const active = t.title === activeThread;
              return (<Thread {...t} key={i} active={active} />);
            })}
          </ul>
            <div className="flex flex-column flex-grow">
            <ul className="p2 h5 flex flex-grow list-reset flex flex-column overflow-scroll m0">
              {find(propEq('title', activeThread), threads).messages.map((c, i) => {
                const primary = c.me;
                return (
                  <Bubble {...c} key={i} primary={primary} />
                );
              })}
            </ul>
            <div className="flex">
              <textarea className='border-top border-gold p1 input gold h6' placeholder='I still have questions…' style={{width: '100%'}} />
            </div>
          </div>
        </div>
      </Window>
    );
  }
}

Contact.propTypes = {
  content: PropTypes.string,
  onClickLink: PropTypes.func,
};

export default Contact;
