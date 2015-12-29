import {combineReducers} from 'redux'
import auth from './modules/user/reducers/login'
import reg from './modules/user/reducers/registrate'
import load from './modules/user/reducers/loadTracks'
import error from './modules/application/reducers/error'
import createPl from './modules/user/reducers/createPlaylist'

export default combineReducers({
    auth: auth,
    tracks: load,
    reg: reg,
    error: error,
    playlists: createPl
});