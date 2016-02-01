/*
 * Desktop
 * This is the first thing users see of our App
 */

import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { selectPlaylistItem } from '../App/actions'

import selector from './selector';

import Book from 'Book';
import MediaPlayer from 'MediaPlayer';
import Window from 'Window';

class Desktop extends React.Component {
  constructor() {
    super();
    this.onChangeRoute = this.onChangeRoute.bind(this)
    this.onClickPlaylistItem = this.onClickPlaylistItem.bind(this)
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onChangeRoute(url) {
    this.props.dispatch(routeActions.push(url));
  }

  onClickPlaylistItem (item) {
    this.props.dispatch(selectPlaylistItem(item))
  }

  render() {
    return (
      <div className='bg-gold vh100 vw100 overflow-hidden'>
        <Window title='Bookshelf' x={300} y={60}>
          <div className='flex flex-wrap p2'>
            {this.props.books.map((book, i) => <Book item={book} key={i} />)}
          </div>
        </Window>
        <MediaPlayer title='Podcasts'
          x={20} y={60}
          clickPlaylistItem={this.onClickPlaylistItem}
          current={this.props.podcasts.get('current')}
          items={this.props.podcasts.get('library')} />

      </div>
    );
  }
}

// Wrap the component to inject dispatch and state into it

export default connect(selector)(Desktop);
