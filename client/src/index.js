import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, compose} from 'redux'
import allReducers from '../reducers'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(allReducers, enhancers)

render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('app'));