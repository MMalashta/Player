import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

let store = createStoreWithMiddleware(reducers, {
    auth: {},
    tracks: []
})

export default store;

export const dispatch = store.dispatch