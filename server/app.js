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

import checkUser from './modules/user/middleware/checkUser'
import User from './documents/User'

import artist from './controllers/artist'
import login from './controllers/login'
import register from './controllers/register'
import playlist from './controllers/playlist'
import tracks from './controllers/tracks'
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

app.use('/api/1/user/auth', login)
app.use('/api/1/user/register', register)
app.use('/api/1/pl', playlist)
app.use('/api/1/tracks', tracks)
app.use('/api/1/artist', artist)

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
