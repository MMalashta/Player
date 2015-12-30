import {LOGIN_USER} from './../constants'
import {SHOW_ERROR} from './../../application/constants'
import {serialize} from '../../../utils/serialize'
import {loadAll} from './loadAllPlaylists'
import {loadTracks} from './loadTracks'
import {dispatch} from '../../../ApplicationStore'

function userAuthenticated(response) {
    if(response.success) {
        dispatch(loadAll({
            userID: response.data._id,
        }));
        dispatch(loadTracks());
        return {
            type: LOGIN_USER,
            data: response.data,
            token: response.token
        }
    } else {
        return {
            type: SHOW_ERROR,
            message: response.message,
        }
    }
}

export const auth = (data): Function => {
    return dispatch => {
        return fetch(`/api/1/user/auth`, { headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        }, method: 'POST', body: serialize(data) })
            .then(response => response.json())
            .then(data => dispatch(userAuthenticated(data)))
    }
};