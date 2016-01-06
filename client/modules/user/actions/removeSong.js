import {PLAYLIST_TRACK_REMOVED} from './../constants'
import {SHOW_ERROR} from './../../application/constants'
import {serialize} from '../../../utils/serialize'
import {loadPl} from './loadPlaylist'
import {dispatch} from '../../../ApplicationStore'

function trackRemoved(response) {
    let playlist = response.playlist;
    if (response.success) {
        dispatch(loadPl({
            playlist: playlist.title ,
            owner: playlist.owner
        }));
        return {
            type: PLAYLIST_TRACK_REMOVED,
            playlist: playlist
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message
        }
    }
}

export const removeTrack = (data): Function => {
    return dispatch => {
        return fetch('/api/1/pl/removeSong', { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(trackRemoved(data)))
    }
};