import React, { Component, PropTypes } from 'react';
// TODO: this shouldn't live with the redux constants
import { ItemTypes } from 'redux/modules/constants';
import { DragSource } from 'react-dnd';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import TrafficLights from 'components/Window/TrafficLights';

const windowSource = {
  beginDrag({ id, x, y }) {
    // console.log(id, x, y);
    return { id, x, y };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

@DragSource(ItemTypes.WINDOW, windowSource, collect)
@immutableRenderDecorator
class Window extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number,
    children: PropTypes.node,
    height: PropTypes.number,
    width: PropTypes.number,
    onSelect: PropTypes.func,
    onClickClose: PropTypes.func,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
  };

  render() {
    console.log('render window', this.props.title);
    const { connectDragSource, isDragging } = this.props;

    const contentStyle = {
      minHeight: this.props.height || 480,
      width: this.props.width || 640,
    };

    const wrapperStyle = {
      opacity: isDragging ? 0.5 : 1,
      top: this.props.y,
      left: this.props.x,
      zIndex: this.props.z * 100,
    };

    return connectDragSource(
      <div
        style={wrapperStyle}
        className="bg-white absolute rounded-2 border border-gold-dark gold"
      >
        <WindowTitle
          {...this.props}
          onClickClose={this.props.onClickClose}
          onSelect={this.props.onSelect}
        />
        <div className="flex flex-column" style={contentStyle}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Window;

function WindowTitle({ title, onClickClose, id }) {
  const cx = 'flex flex-center border-bottom border-gold px1 py1 js-handle';

  const fn = onClickClose.bind(this, id);

  return (
    <div
      className={cx}
      style={{ height: 20 }}
    >
      <TrafficLights onClick={fn} />
      <span
        className="flex-grow center bold h6"
        style={{ marginRight: 41 }}
      >
        {title}
      </span>
    </div>
  );
}
