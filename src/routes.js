import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import App from 'containers/App';
import BootSequence from 'containers/BootSequence';
import Desktop from 'containers/Desktop';

import { openWindow } from 'redux/modules/actions';


export default (store) => {
  function onEnterDesktop(nextState, replace) {
    const title = nextState.params.windowTitle || 'Welcome';
    return store.dispatch(openWindow(title));
  }

  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path='/' component={App}>
      <IndexRoute component={BootSequence} />

      <Route
        path="/desktop(/:windowTitle)"
        component={Desktop}
        onEnter={onEnterDesktop}
      />
    </Route>
  );
};
