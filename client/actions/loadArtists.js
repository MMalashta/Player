import {ARTISTS_LOADED} from './../constants'
import {SHOW_ERROR} from './../constants'
import {serialize} from './../utils/serialize'
import createAsyncAction from 'redux-promise'

function artistsLoaded(response) {
    if (response.success) {
        return {
            type: ARTISTS_LOADED,
            artists: response.data
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message
        }
    }
}

export const loadArtists = (data) => {
    return dispatch => {
        return fetch(`/api/1/artist/load`)
            .then(response => response.json())
            .then(data => dispatch(artistsLoaded(data)))
    }
};
