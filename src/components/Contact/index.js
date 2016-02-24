import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Window from 'components/Window';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

function Bubble({ text, primary }) {
  const cx = classNames('p1', 'mb1', 'rounded-2', 'border', 'border-gold', {
    'bg-white': primary,
    gold: primary,
    'bg-gold': !primary,
    white: !primary,
  });

  console.log(cx);
  return (
    <li style={{ maxWidth: 300, alignSelf: primary ? 'flex-start' : 'flex-end' }} className={cx}>{text}</li>
  );
}

@immutableRenderDecorator
class Contact extends Component {
  render() {
    console.log('render post');
    const conversation = [
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
    ];

    return (
      <Window {...this.props}>
        <div className="p2 h5">
          <ul className='list-reset flex flex-column overflow-scroll'>
            {conversation.map((c, i) => {
              const primary = c.me;
              return (
                <Bubble {...c} key={i} primary={primary} />
              );
            })}
          </ul>
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
