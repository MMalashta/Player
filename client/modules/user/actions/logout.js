import {LOGOUT_USER} from './../constants'

export default function logOut() {
    localStorage.clear();
    return {
        type: LOGOUT_USER
    }
}