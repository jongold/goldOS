import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';

if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}


export default (
  <Route component={App}>
    <Route path="/"
      getComponent={function get(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./containers/BootSequence').default);
        }, 'BootSequence');
      }}
    />

    <Route
      path="/desktop"
      getComponent={function get(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('./containers/Desktop').default);
        }, 'Desktop');
      }}
    />
  </Route>
);
