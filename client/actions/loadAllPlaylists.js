import {PLAYLISTS_LOADED} from './../constants'
import {SHOW_ERROR} from './../constants'
import {serialize} from './../utils/serialize'

function playlistsLoaded(response) {
    if (response.success) {
        return {
            type: PLAYLISTS_LOADED,
            playlists: response.data
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message
        }
    }
}

export const loadAll = (data): Function => {
    return dispatch => {
        return fetch('/api/1/pl/loadAll', { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(playlistsLoaded(data)))
    }
};
