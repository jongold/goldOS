/*
 * Desktop
 * This is the first thing users see of our App
 */

import React from 'react';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ItemTypes } from '../../containers/App/constants'
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { selectPlaylistItem, selectWindow, closeWindow, moveWindow } from '../App/actions'
import { compose } from 'ramda'

import selector from './selector';

import Book from 'Book';
import Habits from 'Habits';
import MediaPlayer from 'MediaPlayer';
import Window from 'Window';
import img from './avatar.png';

import fcssPost from '../../posts/fcss.md'
import welcomePost from '../../posts/welcome.md'

const windowTarget = {
  drop (props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    // const { id } = item
    const x = Math.round(item.x + delta.x);
    const y = Math.round(item.y + delta.y);

    component.moveWindow({ id: item.id, x, y })
  }
}

class Desktop extends React.Component {
  constructor() {
    super();
    this.onChangeRoute = this.onChangeRoute.bind(this)
    this.onClickPlaylistItem = this.onClickPlaylistItem.bind(this)
    this.onSelectWindow = this.onSelectWindow.bind(this)
    this.onCloseWindow = this.onCloseWindow.bind(this)
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChangeRoute(url) {
    this.props.dispatch(routeActions.push(url));
  }

  onSelectWindow (id) {
    this.props.dispatch(selectWindow(id))
  }

  onCloseWindow (id) {
    this.props.dispatch(closeWindow(id))
  }

  onClickPlaylistItem (item) {
    this.props.dispatch(selectPlaylistItem(item))
  }

  moveWindow (item) {
    this.props.dispatch(moveWindow(item))
  }

  render() {
    const { windows, connectDropTarget } = this.props;
    const title = windows.last() ? windows.last().get('title') : 'goldOS'

    return connectDropTarget(
      <div style={{background: `no-repeat center center url(${img}) 50% auto`, backgroundColor: '#DFBA69'}}
        className='bg-gold vh100 vw100 overflow-hidden cu-default'>
        <div className='bg-darken-2 white h6 absolute top-0 left-0 right-0 py1 flex'>
          <div className='bold px2'>λ</div>
          <div className='bold px2'>{ title }</div>
          <div className='px2'>File</div>
          <div className='px2'>Edit</div>
          <div className='px2'>View</div>
          <div className='px2'>Window</div>
          <div className='px2'>Help</div>
        </div>
        {this.props.windows.map((window, i) => {

          switch (window.get('title')) {
            case 'Habits':
              return (
                <Habits key={i}
                  id={window.get('id')}
                  data={this.props.habits}
                  x={300} y={60} z={i}
                  onClickClose={this.onCloseWindow} />
              )

            case 'Bookshelf':
              return (
                <Window key={i}
                  id={window.get('id')}
                  title={window.get('title')}
                  x={window.get('x')} y={window.get('y')} z={i}
                  onSelect={this.onSelectWindow}
                  onClickClose={this.onCloseWindow}>
                  <div className='flex flex-wrap p2'>
                    {this.props.books.map((book, i) => <Book item={book} key={i} />)}
                  </div>
                </Window>
              )

            case 'Podcasts':
              return (
                <MediaPlayer key={i}
                  id={window.get('id')}
                  title={window.get('title')}
                  x={window.get('x')} y={window.get('y')} z={i}
                  onSelect={this.onSelectWindow}
                  onClickClose={this.onCloseWindow}
                  clickPlaylistItem={this.onClickPlaylistItem}
                  current={this.props.podcasts.get('current')}
                  items={this.props.podcasts.get('library')} />
                )

            case 'Welcome':
              return (
                <Window key={i}
                  id={window.get('id')}
                  title={window.get('title')}
                  x={window.get('x')} y={window.get('y')} z={i}
                  onClickClose={this.onCloseWindow}>
                  <div className='h6 p2' dangerouslySetInnerHTML={{__html: welcomePost}} />
                </Window>
              )
            case 'functional css':
              return (
                <Window key={i}
                  id={window.get('id')}
                  title={window.get('title')}
                  x={window.get('x')} y={window.get('y')} z={i}
                  onSelect={this.onSelectWindow}
                  onClickClose={this.onCloseWindow}>
                  <div className='h6 p2 overflow-scroll'
                    style={{maxHeight: '640px'}}
                    dangerouslySetInnerHTML={{__html: fcssPost}} />
                </Window>
              )
          }
        })}
      </div>
    );
  }
}

export default compose(
  connect(selector),
  DragDropContext(HTML5Backend),
  DropTarget(ItemTypes.WINDOW, windowTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Desktop)
