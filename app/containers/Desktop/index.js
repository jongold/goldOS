/*
 * Desktop
 * This is the first thing users see of our App
 */

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { selectPlaylistItem, closeWindow } from '../App/actions'

import selector from './selector';

import Book from 'Book';
import Habits from 'Habits';
import MediaPlayer from 'MediaPlayer';
import Window from 'Window';

import fcssPost from '../../posts/fcss.md'
import welcomePost from '../../posts/welcome.md'


class Desktop extends React.Component {
  constructor() {
    super();
    this.onChangeRoute = this.onChangeRoute.bind(this)
    this.onClickPlaylistItem = this.onClickPlaylistItem.bind(this)
    this.onCloseWindow = this.onCloseWindow.bind(this)
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChangeRoute(url) {
    this.props.dispatch(routeActions.push(url));
  }

  onCloseWindow (title) {
    this.props.dispatch(closeWindow(title))
  }

  onClickPlaylistItem (item) {
    this.props.dispatch(selectPlaylistItem(item))
  }

  render() {
    return (
      <div className='bg-gold vh100 vw100 overflow-hidden cu-default'>
        {this.props.windows.map((window, i) => {
          switch (window) {
            case 'Habits':
              return <Habits key={i}
                data={this.props.habits}
                x={300} y={60}
                onClickClose={this.onCloseWindow} />
            case 'Bookshelf':
              return (
                <Window key={i}
                  title='Bookshelf'
                  x={300} y={60}
                  onClickClose={this.onCloseWindow}>
                  <div className='flex flex-wrap p2'>
                    {this.props.books.map((book, i) => <Book item={book} key={i} />)}
                  </div>
                </Window>
              )

            case 'Podcasts':
              return (
                <MediaPlayer key={i}
                  title='Podcasts'
                  x={20} y={60}
                  onClickClose={this.onCloseWindow}
                  clickPlaylistItem={this.onClickPlaylistItem}
                  current={this.props.podcasts.get('current')}
                  items={this.props.podcasts.get('library')} />
                )

            case 'Welcome':
              return (
                <Window key={i}
                  title='welcome'
                  onClickClose={this.onCloseWindow}>
                  <div className='h6 p2' dangerouslySetInnerHTML={{__html: welcomePost}} />
                </Window>
              )
            case 'functional css':
              return (
                <Window key={i}
                  title='functional css'
                  onClickClose={this.onCloseWindow}>
                  <div className='h6 p2' dangerouslySetInnerHTML={{__html: fcssPost}} />
                </Window>
              )
          }
        })}
      </div>
    );
  }
}

// Wrap the component to inject dispatch and state into it

export default connect(selector)(Desktop);
