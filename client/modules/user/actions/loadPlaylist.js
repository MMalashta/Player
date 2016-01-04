import {PLAYLIST_LOADED} from './../constants'
import {SHOW_ERROR} from './../../application/constants'
import {serialize} from '../../../utils/serialize'

function playlistLoaded(response) {
    if (response.success) {
        console.log(response.data);
        return {
            type: PLAYLIST_LOADED,
            data: response.data
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message
        }
    }
}

export const loadPl = (data): Function => {
    return dispatch => {
        return fetch('/api/1/pl/load', { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(playlistLoaded(data)))
    }
};