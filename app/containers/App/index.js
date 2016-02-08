/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component, PropTypes } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
