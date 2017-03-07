import {TRACKS_LOADED} from './../constants'
import {SHOW_ERROR} from './../constants'
import {serialize} from './../utils/serialize'
import createAsyncAction from 'redux-promise'

function tracksLoaded(response) {
    if (response.success) {
        return {
            type: TRACKS_LOADED,
            tracks: response.data
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message
        }
    }
}

export const loadTracks = (data) => {
    return dispatch => {
        return fetch(`/api/1/tracks`)
            .then(response => response.json())
            .then(data => dispatch(tracksLoaded(data)))
    }
};
