import {combineReducers} from 'redux'
import auth from './reducers/login'
import reg from './reducers/registrate'
import loadTracks from './reducers/loadTracks'
import loadArtists from './reducers/loadArtists'
import error from './reducers/error'
import playlists from './reducers/playlists'

export default combineReducers({
    auth: auth,
    tracks: loadTracks,
    artists: loadArtists,
    reg: reg,
    error: error,
    playlists: playlists
});
