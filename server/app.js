import songSet from './utils/loadSongs'
import playlist from './utils/playlist'

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
import session from 'cookie-session'
var routes = require('./routes/index');
var users = require('./routes/users');

var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/player');
import {getToken} from './modules/user/service/TokenService'
import checkUser from './modules/user/middleware/checkUser'
import User from './modules/user/documents/User'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({keys: ['Great123']}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    if(req.path.includes('api/1')) {
        next()
    } else {
        var options = {
            root: path.join(__dirname + '/../public'),
            dotfiles: 'deny'
        };

        res.sendFile('index.html', options, function (err) {
            if (err) {
                res.status(err.status).end();
            }
        });
    }
});

app.use(checkUser);

    app.post('/api/1/user/auth', (req, res, next) => {
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
                    //message: err.message,
                    //data: user
                });
            }
        }))(req, res, next)
    } else {
        res.json(req._auth.user)
    }
});

app.post('/api/1/user/register', (req, res, next) => {
    console.log(req.body);
    let {username, email, password} = req.body;

    var userData = new User({
        username: username,
        email: email,
        password: password
    });
    console.log(userData);
    User.register(userData, req.body.password, (err) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
            //res.json({err, userData})
        }

        res.json({
            success: true
        })
    })
});

app.get('/api/1/tracks', (req, res, next) => {
    res.json({
        success: true,
        data: songSet
    })
});

app.post('/api/1/pl/create', (req, res, next) => {
    var pl = new playlist(req.body.title, req.body.owner);
    if (pl) {
        res.json({
            success: true,
            data: pl
        });
    }
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
