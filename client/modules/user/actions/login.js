import {LOGIN_USER} from './../constants'
import {SHOW_ERROR} from './../../application/constants'
import fetch from 'isomorphic-fetch'
import createAsyncAction from 'redux-promise'

function userAuthenticated(response) {
    if(response.success) {
        return {
            type: LOGIN_USER,
            data: response.data
        }
    } else {
        return {
            type: SHOW_ERROR,
            error: `Check your credentials`,
            data: response.data
        }
    }
}

export const auth = (data): Function => {
    return dispatch => {
        return fetch(`/api/1/user/auth`)
            .then(response => response.json())
            .then(data => dispatch(userAuthenticated(data)))
    }
}

export const loadTracks = (data) => {
    return dispatch => {
        return fetch(`/api/1/tracks`)
            .then(response => response.json())
            .then(data => dispatch({
                type: "TRACKS_LOADED",
                ...data
            }))
    }
}