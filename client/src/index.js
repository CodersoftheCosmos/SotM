import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import allReducers from '../reducers'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { autoRehydrate } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';

import App from './App';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const middlewares = applyMiddleware(thunk)

const store = createStore(allReducers, enhancers, middlewares)

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('app'));


