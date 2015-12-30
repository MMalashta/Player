import {TRACK_ADDED} from './../constants'
import {SHOW_ERROR} from './../../application/constants'
import {serialize} from '../../../utils/serialize'

function trackAdded(response) {
    if (response.success) {
        return {
            type: TRACK_ADDED,
            data: response.data,
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message,
        }
    }
}

export const addTrack = (data): Function => {
    return dispatch => {
        return fetch('/api/1/pl/addSong', { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(trackAdded(data)))
    }
};