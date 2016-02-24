import React from 'react';
import { Route } from 'react-router';
import Desktop from 'containers/Desktop';

import { openWindow } from 'redux/modules/actions';


export default (store) => {
  function onEnterDesktop(nextState) {
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
