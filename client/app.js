import React, {Component} from 'react'
import {Router, Route, IndexRoute, Link} from 'react-router'
import { pushPath } from 'redux-simple-router'
import {Provider} from 'react-redux'
import {render} from 'react-dom'
import ApplicationStore, {dispatch} from './ApplicationStore'
import history from './history'
import {Layout, Home} from './modules/application/index'

import {auth, loadTracks} from './modules/user/actions/login'

window.login = () => dispatch(auth({
    login: "test",
    password:   'test'
}));

window.loadTracks = () => dispatch(loadTracks());

ApplicationStore.subscribe(() =>
    console.log(ApplicationStore.getState())
);

render((
    <Provider store={ApplicationStore}>
        <Router history={history}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Home}/>
            </Route>
        </Router>
    </Provider>
), document.querySelector("#app"));