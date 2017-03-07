import { Router } from 'express'
import User from './../documents/User'

const router = Router()

router.post('/', (req, res, next) => {
    let {username, email, password} = req.body;

    var userData = new User({
        username: username,
        email: email,
        password: password
    });

    User.register(userData, req.body.password, (err) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true
        })
    })
});

export default router
