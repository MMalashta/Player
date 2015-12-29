import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

let store = createStoreWithMiddleware(reducers, {
    auth: {},
    tracks: [],
    reg: [],
    error: {},
    playlists: []
});

export default store;

export const dispatch = store.dispatch;