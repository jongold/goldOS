/**
 *
 * app.js
 *
 * This is the entry file for the application, mostly just setup and boilerplate
 * code. Routes are configured at the end of this file!
 *
 */

import 'babel-polyfill';

// Load the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
// import FontFaceObserver from 'fontfaceobserver';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { fromJS } from 'immutable';
import { compose } from 'ramda';
const reduxRouterMiddleware = syncHistory(browserHistory);

import './containers/App/styles.css';

/*
*   Create the store with two middlewares :
*   1. redux-thunk : Allow us to asynchronous things in the actions
*   2. reduxRouterMiddleware : Sync dispatched route actions to the history
*/

import rootReducer from './rootReducer';
const createStoreWithMiddleware = compose(
  applyMiddleware(reduxRouterMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreWithMiddleware(rootReducer, fromJS({}));
reduxRouterMiddleware.listenForReplays(store, (state) => state.get('route').location);

// Make reducers hot reloadable, see http://mxs.is/googmo
if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    const nextRootReducer = require('./rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}
import { Route } from 'react-router';
import App from './containers/App';
import BootSequence from './containers/BootSequence';
import Desktop from './containers/Desktop';

import { openWindow } from './containers/App/actions';

function onEnterDesktop(nextState) {
  const title = nextState.params.windowTitle || 'Welcome';
  return store.dispatch(openWindow(title));
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/"
          component={BootSequence}
        />

      <Route
        path="/desktop(/:windowTitle)"
        component={Desktop}
        onEnter={onEnterDesktop}
      />
    </Route>
  </Router>
</Provider>,
document.getElementById('app')
);
