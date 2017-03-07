import {PLAYLIST_REMOVED} from './../constants'
import {SHOW_ERROR} from './../constants'
import {serialize} from './../utils/serialize'
import createAsyncAction from 'redux-promise'

function playlistRemoved(response) {
    if (response.success) {
        return {
            type: PLAYLIST_REMOVED,
            removePlaylistIds: response.removePlaylistIds
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message
        }
    }
}

export const removePl = (data): Function => {
    return dispatch => {
        return fetch('/api/1/pl/remove', { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(playlistRemoved(data)))
    }
};
