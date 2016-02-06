import React, { Component } from 'react';
import { ItemTypes } from '../../containers/App/constants'
import { DragSource } from 'react-dnd';

const windowSource = {
  beginDrag({ id, x, y }) {
    return { id, x, y }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Window extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    id: React.PropTypes.number.isRequired,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    z: React.PropTypes.number,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    onSelect: React.PropTypes.func,
    onClickClose: React.PropTypes.func,
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props

    const contentStyle = {
      minHeight: this.props.height || 480,
      width: this.props.width || 640
    }

    const wrapperStyle = {
      opacity: isDragging ? 0.5 : 1,
      top: this.props.y,
      left: this.props.x,
      zIndex: this.props.z * 100
    }

    return connectDragSource(
      <div style={wrapperStyle}
        className='bg-white absolute rounded-2 border border-gold gold'>
        <WindowTitle {...this.props}
          onClickClose={this.props.onClickClose}
          onSelect={this.props.onSelect} />
        <div style={contentStyle}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default DragSource(ItemTypes.WINDOW, windowSource, collect)(Window)

class TrafficLights extends Component {
  state = { hovered: false };

  render () {
    const fillColor = this.state.hovered ? 'fill-gold' : 'fill-white'
    return (
      <svg version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="40.6px"
        height="11px"
        onClick={this.props.onClick}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
        viewBox="0 0 40.6 11">
        <g>
          <path className={fillColor} d="M35.1,9.9c-2.4,0-4.4-2-4.4-4.4s2-4.4,4.4-4.4s4.4,2,4.4,4.4S37.5,9.9,35.1,9.9z"/>
          <path className="fill-gold" d="M35.1,2.2c1.8,0,3.3,1.5,3.3,3.3s-1.5,3.3-3.3,3.3s-3.3-1.5-3.3-3.3S33.3,2.2,35.1,2.2 M35.1,0
            c-3,0-5.5,2.5-5.5,5.5S32,11,35.1,11s5.5-2.5,5.5-5.5S38.1,0,35.1,0L35.1,0z"/>
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
};

const WindowTitle = ({ title, onClickClose, onSelect, id }) => {
  const cx = 'flex flex-center border-bottom border-gold px1 py1 js-handle';

  return (
    <div className={cx} style={{height: 20}}>
      <TrafficLights onClick={() => onClickClose(id)} />
      <span className='flex-grow center bold h6' style={{marginRight: 41}}>{title}</span>
    </div>
  );
};
