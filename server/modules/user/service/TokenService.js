import Token from './../../../documents/Token'
import randomstring from 'randomstring'

function createToken(user) {
    return new Promise((resolve, reject) => {
        let token = new Token({
            token: randomstring.generate(32),
            user
        })

        token.save(() => {
            resolve(token)
        })
    })
}

export function getUser(token) {
    return new Promise((resolve, reject) => {
        Token.findOne({token}).populate('user').exec().then((data, error) => {
            if(!error) {
                resolve(data.user)
            } else {
                reject(error)
            }
        })
    })
}

export function getToken(user) {
    return new Promise((resolve:Function, reject:Function) => {
        Token.findOne({user: user._id}).exec().then((data, error) => {
            if(!error) {
                if(data) {
                    resolve(data)
                } else {
                    createToken(user).then(token => {
                        resolve(token)
                    })
                }
            } else {
                reject(error)
            }
        })
    })
}
