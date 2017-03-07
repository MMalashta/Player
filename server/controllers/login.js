import { Router } from 'express'
import { getToken } from './../modules/user/service/TokenService'
import passport from 'passport'

const router = Router()

router.post('/', (req, res, next) => {
  if(!req._auth.authenticated) {
      (passport.authenticate('local', {session: false}, function(err, user, info) {
          if(user) {
              getToken(user).then(token => {
                  res.json({
                      success: true,
                      token: token,
                      data: user
                  });
              }).catch(error => {
                  res.json({
                      success: false,
                      message: error.message
                  })
              })
          } else {
              res.json({
                  success: false,
                  message: info.message
              });
          }
      }))(req, res, next)
  } else {
      res.json(req._auth.user)
  }
});

export default router
