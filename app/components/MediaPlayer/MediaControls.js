import React, { Component, PropTypes } from 'react';
import { PlayButton, Progress, Timer, NextButton, PrevButton } from 'react-soundplayer/components';

export default class MediaControls extends Component {
  render() {
    const { currentItem, currentTime, duration } = this.props;

    return (
      <div className="p1 flex flex-column border-bottom border-gold">
        <div>
          <h6>{currentItem.get('title')}
          </h6>
          <h6 className="regular mt0">
            {currentItem.get('date')}
            <Timer className="h6 mb1 right" {...this.props} />
          </h6>
        </div>

        <Progress value={currentTime / duration * 100 || 0}
          className="border border-gold"
          innerClassName="bg-gold"
          {...this.props}
        />

        <div className="flex mt1">
          <PrevButton className="flex-none border-gold border p1 rounded-2 mr1"
            {...this.props}
          />
          <PlayButton className="flex-none border-gold border p1 rounded-2 mr1"
            {...this.props}
          />
          <NextButton className="flex-none border-gold border p1 rounded-2 mr1"
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

MediaControls.propTypes = {
  currentItem: PropTypes.string,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
};
