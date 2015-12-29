import {PLAYLIST_CREATED} from './../constants'
import {SHOW_ERROR} from './../../application/constants'
import {serialize} from '../../../utils/serialize'
import createAsyncAction from 'redux-promise'

function playlistCreated(response) {
    if (response.success) {
        return {
            type: PLAYLIST_CREATED,
            data: response.data,
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message,
        }
    }
}

export const createPl = (data): Function => {
    return dispatch => {
        return fetch('/api/1/pl/create', { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(playlistCreated(data)))
    }
};