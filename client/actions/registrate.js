import {REGISTRATE_USER} from './../constants'
import {SHOW_ERROR} from './../constants'
import {serialize} from './../utils/serialize'
import createAsyncAction from 'redux-promise'

function userRegistrated(response) {
    if (response.success) {
        alert('You\'re registrated in');
        return {
            type: REGISTRATE_USER
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message
        }
    }
}

export const registrate = (data): Function => {
    return dispatch => {
        return fetch('http://localhost:3000/api/1/user/register', { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(userRegistrated(data)))
    }
};
