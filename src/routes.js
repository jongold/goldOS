import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';

import Desktop from 'containers/Desktop';

import { openWindow } from 'redux/modules/actions';


export default (store) => {
  function onEnterDesktop(nextState, replace) {
    const title = nextState.params.windowTitle || 'Welcome';
    return store.dispatch(openWindow(title));
  }

  return (
    <Route
      path="/(:windowTitle)"
      component={Desktop}
      onEnter={onEnterDesktop}
    />
  );
};
