import React, { Component } from 'react';
import classNames from 'classnames'

import { PlayButton, Progress, Icons, Timer, NextButton, PrevButton } from 'react-soundplayer/components';
import { SoundPlayerContainer } from 'react-soundplayer/addons';
import Window from 'Window';

const CLIENT_ID = '08f79801a998c381762ec5b15e4914d5'

class MediaControls extends Component {
  render () {
    const { currentItem, currentTime, duration } = this.props

    return (
      <div className='p1 flex flex-column border-bottom border-gold'>
        <div>
          <h6>{currentItem.get('title')}
          </h6>
          <h6 className='regular mt0'>
            {currentItem.get('date')}
            <Timer className='h6 mb1 right' {...this.props} />
          </h6>
        </div>

        <Progress value={currentTime / duration * 100 || 0}
          className='border border-gold'
          innerClassName='bg-gold'
          {...this.props} />

        <div className='flex mt1'>
          <PrevButton className='flex-none border-gold border p1 rounded-2 mr1'
            {...this.props} />
          <PlayButton className='flex-none border-gold border p1 rounded-2 mr1'
            {...this.props} />
          <NextButton className='flex-none border-gold border p1 rounded-2 mr1'
            {...this.props} />
        </div>
      </div>
    )
  }
}

class MediaPlayer extends Component {
  render () {
    const { title, items, current, clickPlaylistItem } = this.props
    const currentItem = items.find((item) => (item.get('title') === current))

    return (
      <Window title={title} height={240} width={260} {...this.props}>
        <div>
          <SoundPlayerContainer resolveUrl={currentItem.get('url')} clientId={CLIENT_ID}>
            <MediaControls currentItem={currentItem} />
          </SoundPlayerContainer>
        </div>
        <div className='p1'>
          <ul className='m0 list-reset'>
            {items.map((episode, i) => {
              const hasUrl = episode.has('url')
              const title = episode.get('title')
              const cx = classNames('h6', {
                'bold': title === current,
                'muted': !hasUrl,
                'cu-pointer': hasUrl,
                'cu-not-allowed': !hasUrl
              })

              return (<li key={i}
                className={cx}
                onClick={hasUrl ? () => clickPlaylistItem(title) : null}>
                {(title === current) ? '▶︎' : null} {title}
                { hasUrl ? null : ' (soon)' }
              </li>)
            })}
          </ul>
        </div>
      </Window>
    )
  }
}

export default MediaPlayer;
