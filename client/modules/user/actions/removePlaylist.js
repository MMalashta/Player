import {PLAYLIST_REMOVED} from './../constants'
import {SHOW_ERROR} from './../../application/constants'
import {serialize} from '../../../utils/serialize'
import createAsyncAction from 'redux-promise'

function playlistRemoved(response) {
    if (response.success) {
        console.log("REMOVE", response);
        return {
            type: PLAYLIST_REMOVED,
            data: response.data
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