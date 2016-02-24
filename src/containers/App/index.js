/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Component, PropTypes } from 'react';
import config from '../../config';
import styles from './styles.css';
import Helmet from 'react-helmet';

class App extends Component {
  render() {
    return (
      <div>
        <Helmet {...config.app.head} />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default App;
