import React, { Component, PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

import { SoundPlayerContainer } from 'react-soundplayer/addons';
import MediaControls from './MediaControls';
import Window from 'Window';

const CLIENT_ID = '08f79801a998c381762ec5b15e4914d5';

class MediaPlayer extends Component {
  render() {
    const { title, items, current, clickPlaylistItem } = this.props;
    const currentItem = items.find((item) => (item.get('title') === current));

    return (
      <Window title={title} height={240} width={260} {...this.props}>
        <div>
          <SoundPlayerContainer resolveUrl={currentItem.get('url')} clientId={CLIENT_ID}>
            <MediaControls currentItem={currentItem} />
          </SoundPlayerContainer>
        </div>
        <div className="p1">
          <ul className="m0 list-reset">
            {items.map((episode, i) => {
              const hasUrl = episode.has('url');
              const t = episode.get('title');
              const cx = classNames('h6', {
                bold: t === current,
                muted: !hasUrl,
                'cu-pointer': hasUrl,
                'cu-not-allowed': !hasUrl,
              });

              return (
                <li
                  key={i}
                  className={cx}
                  onClick={hasUrl ? () => clickPlaylistItem(t) : null}
                >
                  {(title === current) ? '▶︎' : null} {t}
                  { hasUrl ? null : ' (soon)' }
                </li>
              );
            })}
          </ul>
        </div>
      </Window>
    );
  }
}

MediaPlayer.propTypes = {
  title: PropTypes.string,
  items: IPropTypes.list,
  current: PropTypes.string,
  clickPlaylistItem: PropTypes.func,
};

export default MediaPlayer;
