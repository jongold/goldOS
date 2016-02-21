import React, { Component, PropTypes } from 'react';

export default class TrafficLights extends Component {
  constructor() {
    super();
    this.onHover = this.onHover.bind(this);
    this.offHover = this.offHover.bind(this);
  }

  state = { hovered: false };

  onHover() {
    this.setState({ hovered: true });
  }

  offHover() {
    this.setState({ hovered: false });
  }

  render() {
    const fillColor = this.state.hovered ? 'fill-gold' : 'fill-white';
    return (
      <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="40.6px"
        height="11px"
        onClick={this.props.onClick}
        onMouseEnter={this.onHover}
        onMouseLeave={this.offHover}
        viewBox="0 0 40.6 11"
      >
        <g>
          <path className={fillColor} d="M35.1,9.9c-2.4,0-4.4-2-4.4-4.4s2-4.4,4.4-4.4s4.4,2,4.4,4.4S37.5,9.9,35.1,9.9z"/>
          <path className="fill-gold" d="M35.1,2.2c1.8,0,3.3,1.5,3.3,3.3s-1.5,3.3-3.3,3.3s-3.3-1.5-3.3-3.3S33.3,2.2,35.1,2.2 M35.1,0
            c-3,0-5.5,2.5-5.5,5.5S32,11,35.1,11s5.5-2.5,5.5-5.5S38.1,0,35.1,0L35.1,0z"
          />
        </g>
        <g>
          <rect x="16.6" y="1.5" className={fillColor} width="8" height="8"/>
          <path className="fill-gold" d="M23.6,2.5v6h-6v-6H23.6 M25.6,0.5h-10v10h10V0.5L25.6,0.5z"/>
        </g>
        <g>
          <polygon className={fillColor} points="1.7,9.5 6.1,2 10.4,9.5"/>
          <path className="fill-gold" d="M6.1,4l2.6,4.5H3.5L6.1,4 M6.1,0L0,10.5h12.2L6.1,0L6.1,0z"/>
        </g>
      </svg>
    );
  }
}

TrafficLights.propTypes = {
  onClick: PropTypes.func,
};
