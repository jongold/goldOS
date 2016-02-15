/*
 * Desktop
 * This is the first thing users see of our App
 */

import React, { Component, PropTypes } from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ItemTypes } from '../../containers/App/constants';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { selectPlaylistItem, selectWindow, closeWindow, moveWindow } from '../App/actions';
import selector from './selector';

import Bookshelf from 'Bookshelf';
import Habits from 'Habits';
import Map from 'Map';
import MediaPlayer from 'MediaPlayer';
import Post from 'Post';
import img from './avatar.png';

import welcomePost from '../../posts/welcome.md';

const windowTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const x = Math.round(item.x + delta.x);
    const y = Math.round(item.y + delta.y);

    component.moveWindow({ id: item.id, x, y });
  },
};

@connect(selector)
@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.WINDOW, windowTarget, dropConnect => ({
  connectDropTarget: dropConnect.dropTarget(),
}))
class Desktop extends Component {
  constructor() {
    super();
    this.onChangeRoute = this.onChangeRoute.bind(this);
    this.onClickPlaylistItem = this.onClickPlaylistItem.bind(this);
    this.onSelectWindow = this.onSelectWindow.bind(this);
    this.onCloseWindow = this.onCloseWindow.bind(this);
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChangeRoute(url) {
    this.props.dispatch(routeActions.push(url));
  }

  onSelectWindow(id) {
    this.props.dispatch(selectWindow(id));
  }

  onCloseWindow(id) {
    this.props.dispatch(closeWindow(id));
  }

  onClickPlaylistItem(item) {
    this.props.dispatch(selectPlaylistItem(item));
  }

  moveWindow(item) {
    this.props.dispatch(moveWindow(item));
  }

  renderWindows() {
    return this.props.windows.map((win, i) => {
      switch (win.get('title')) {
        case 'Habits':
          return (
            <Habits key={i}
              id={win.get('id')}
              title={win.get('title')}
              data={this.props.habits}
              x={win.get('x')} y={win.get('y')} z={i}
              onSelect={this.onSelectWindow}
              onClickClose={this.onCloseWindow}
            />
          );

        case 'Bookshelf':
          return (
            <Bookshelf key={i}
              id={win.get('id')}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={i}
              books={this.props.books}
              onSelect={this.onSelectWindow}
              onClickClose={this.onCloseWindow}
            />
          );

        case 'Podcasts':
          return (
            <MediaPlayer key={i}
              id={win.get('id')}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={i}
              onSelect={this.onSelectWindow}
              onClickClose={this.onCloseWindow}
              clickPlaylistItem={this.onClickPlaylistItem}
              current={this.props.podcasts.get('current')}
              items={this.props.podcasts.get('library')}
            />
          );

        case 'Welcome':
          return (
            <Post
              key={i}
              id={win.get('id')}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={i}
              content={welcomePost}
              onClickClose={this.onCloseWindow}
            />
          );

        case 'Nomad Travels':
          return (
            <Map
              key={i}
              id={win.get('id')}
              title={win.get('title')}
              x={win.get('x')} y={win.get('y')} z={i}
              places={this.props.travel}
              height={480} width={640}
              onClickClose={this.onCloseWindow}
            />
          );
        default:
          return null;
      }
    });
  }

  render() {
    const { windows, connectDropTarget } = this.props;
    const title = windows.last() ? windows.last().get('title') : 'goldOS';

    return connectDropTarget(
      <div
        style={{ background: `no-repeat center center url('${img}')`,
          backgroundSize: `50% auto`, backgroundColor: '#DFBA69' }}
        className="bg-gold vh100 vw100 overflow-hidden cu-default"
      >
        <div className="bg-darken-2 white h6 absolute top-0 left-0 right-0 py1 flex">
          <div className="bold px2">λ</div>
          <div className="bold px2">{ title }</div>
          <div className="px2">File</div>
          <div className="px2">Edit</div>
          <div className="px2">View</div>
          <div className="px2">Window</div>
          <div className="px2">Help</div>
        </div>
        {this.renderWindows()}
      </div>
    );
  }
}

Desktop.propTypes = {
  dispatch: PropTypes.func,
  windows: IPropTypes.list,
  habits: PropTypes.array,
  books: IPropTypes.list,
  podcasts: IPropTypes.map,
  travel: IPropTypes.list,
  connectDropTarget: PropTypes.func,
};

export default Desktop;