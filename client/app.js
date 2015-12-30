import React, {Component} from 'react'
import {Router, Route, IndexRoute, Link} from 'react-router'
import { pushPath } from 'redux-simple-router'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import ApplicationStore, {dispatch} from './ApplicationStore'
import history from './history'
import {Layout, Home, Player} from './modules/application/index'

ApplicationStore.subscribe(() =>
    console.log(ApplicationStore.getState())
);

render((
    <Provider store={ApplicationStore}>
        <Router history={history}>
            <Route path="/" component={Layout}>
            </Route>
        </Router>
    </Provider>
), document.querySelector("#app"));