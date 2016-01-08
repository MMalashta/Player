import {combineReducers} from 'redux'
import auth from './modules/user/reducers/login'
import reg from './modules/user/reducers/registrate'
import loadTracks from './modules/user/reducers/loadTracks'
import loadArtists from './modules/user/reducers/loadArtists'
import error from './modules/application/reducers/error'
import playlists from './modules/user/reducers/playlists'

export default combineReducers({
    auth: auth,
    tracks: loadTracks,
    artists: loadArtists,
    reg: reg,
    error: error,
    playlists: playlists
});