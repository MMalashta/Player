import {getUser} from './../service/TokenService'

export default function(req, res, next) {
    let token = req.header("token");
    if(token && token != null) {
        getUser(token).then((user) => {
            if(user && user != null) {
                req._auth = {
                    authenticated: true,
                    user
                }
            } else {
                req._auth = {
                    authenticated: false,
                    user: {}
                }
            }

            next()
        })
    } else {
        req._auth = {
            authenticated: false,
            user: {}
        }

        next()
    }
}