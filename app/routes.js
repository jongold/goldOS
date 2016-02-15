import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import BootSequence from './containers/BootSequence';
import Desktop from './containers/Desktop';

if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}


export default (
  <Route component={App}>
    <Route path="/"
      component={BootSequence}
    />

    <Route
      path="/desktop"
      component={Desktop}
    />
  </Route>
);
