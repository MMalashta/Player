import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
persistStore(store);

export default store;

export const dispatch = store.dispatch;