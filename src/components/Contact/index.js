import React, { Component, PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';
import Window from 'components/Window';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import { append, compose, curry, join, split, take } from 'ramda';

const words = curry((n, str) => {
  return compose(
    join(' '),
    append('…'),
    take(n),
    split(' ')
  )(str);
});

const excerpt = xs => {
  return words(10, xs.first().get('text'));
};

function Thread({ title, active, preview, onClick }) {
  const cx = classNames('px2', 'py1', 'h6', 'border-bottom', 'border-gold', {
    'bg-white': !active,
    gold: !active,
    'bg-gold': active,
    white: active,
  });

  return (
    <li className={cx} onClick={onClick}>
      <h5>{title}</h5>
      <p className="italic">{ preview }</p>
    </li>
  );
}

function Bubble({ text, img, primary }) {
  const cx = classNames('p1', 'h6', 'mb1', 'rounded-2', 'border', 'border-gold', {
    'bg-white': primary,
    gold: primary,
    'bg-gold': !primary,
    white: !primary,
  });

  return (
    <li style={{ maxWidth: 300, alignSelf: primary ? 'flex-start' : 'flex-end' }} className={cx}>
      <div dangerouslySetInnerHTML={{ __html: text }} />
      { img && <img src={img} /> }
     </li>
  );
}

@immutableRenderDecorator
class Contact extends Component {
  render() {
    const { data, onClickThread } = this.props;
    const threads = data.get('threads');
    const activeThread = data.get('activeThread');
    console.log('render post');
    console.log(threads);

    return (
      <Window {...this.props}>
        <div className="flex flex-grow">
          <ul className="flex flex-column list-reset border-right border-gold m0" style={{ maxWidth: 250 }}>
            {threads.map((t, i) => {
              const title = t.get('title');
              const active = title === activeThread;
              const preview = excerpt(t.get('messages'));
              const onClick = (e) => {
                e.preventDefault();
                onClickThread(title);
              };

              return (
                <Thread
                  key={i}
                  title={title}
                  onClick={onClick}
                  preview={preview}
                  active={active}
                />
              );
            })}
          </ul>
          <div className="flex flex-column flex-grow overflow-scroll relative" style={{ maxHeight: 480 }}>
            <ul className="p2 h5 flex flex-grow list-reset flex flex-column m0">
              {threads.find((t) => t.get('title') === activeThread).get('messages').map((c, i) => {
                const primary = c.get('me');
                const text = c.get('text');
                return (
                  <Bubble
                    key={i}
                    text={text}
                    img={c.get('img')}
                    primary={primary}
                  />
                );
              })}
            </ul>
            {/* <div className="flex absolute bottom-0 right-0 left-0"> */}
            {/*   <textarea */}
            {/*     className="border-top border-gold p1 input gold h6" */}
            {/*     placeholder="I still have questions…" */}
            {/*     style={{ width: '100%' }} */}
            {/*   /> */}
            {/* </div> */}
          </div>
        </div>
      </Window>
    );
  }
}

Contact.propTypes = {
  data: IPropTypes.shape({
    activeThread: PropTypes.string,
    threads: IPropTypes.list,
  }),
  onClickLink: PropTypes.func,
  onClickThread: PropTypes.func,
};

export default Contact;
