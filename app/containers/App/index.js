/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='bg-darken-2 white h6 absolute top-0 left-0 right-0 py1 flex'>
          <div className='bold px2'>λ</div>
          <div className='bold px2'>Podcasts</div>
          <div className='px2'>File</div>
          <div className='px2'>Edit</div>
          <div className='px2'>View</div>
          <div className='px2'>Window</div>
          <div className='px2'>Help</div>
        </div>
        { this.props.children }
      </div>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default connect()(App);
