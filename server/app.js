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
import Playlist from './modules/application/documents/Playlist'
import Song from './modules/application/documents/Song'

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
    var songSet = new Set();
    Song.find((err,songs) =>{
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
        }
        songs.forEach((song) => {songSet.add(song)});
        res.json({
            success: true,
            data: songSet
        })
    });
});

app.post('/api/1/pl/create', (req, res, next) => {
    console.log(req.body);
    let promise = new Promise((resolve, reject) => {
        Playlist.findOne({"title": req.body.title, "owner": req.body.owner}, (err, pl) => {
            if (err) {
                reject(err.message);
            }
            if (pl && pl != null) {
                reject("playlist with given name is already created");
            } else {
                resolve(req.body);
            }

        });
    });
    promise.
    then(
        result => {
            let pl = new Playlist({
                title: result.title,
                owner: result.owner,
                tracks: []
            });
            console.log(pl.title);
            pl.save((err, pl) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.message
                    });
                }
                return res.json({
                    success: true,
                    data: pl
                });
            });
        },
        error => {
            return res.json({
                success: false,
                message: error
            });
        }
    );
});

app.post('/api/1/pl/loadAll', (req, res, next) => {
    Playlist.find({"owner": req.body.userID}, (err, playlists)=> {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
        return res.json({
            success: true,
            data: playlists
        });
    })
});

app.post('/api/1/pl/addSong', (req, res, next) => {
    let playlistName = req.body.playlist,
        songId = req.body.id;

    Playlist.findOne({"title": playlistName}, (err, pl) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }

        if (pl && pl != null) {
            if (pl.tracks.indexOf(songId) === -1) {
                pl.tracks.push(songId);
                pl.modified = new Date();

                pl.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.message
                        });
                    }
                    return res.json({
                        success: true,
                        song: songId,
                        playlist: pl._id
                    });
                });
            } else {
                return res.json({
                    success: false,
                    message: "you have this song in your playlist already"
                });
            }
        }
    });
});

app.post('/api/1/pl/removeSong', (req, res, next) => {
    Playlist.findOne({'_id' : req.body.playlistID}, (err, pl) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
        if (pl && pl != null) {
            let index = pl.tracks.indexOf(req.body.songID);
            if (index === -1) {
                return res.json({
                    success: false,
                    message: "can't find this song in playlist"
                });
            } else {
                pl.tracks.splice(index, 1);
                pl.modified = new Date();
                pl.save(function (err) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: err.message
                        });
                    }
                    return res.json({
                        success: true,
                        playlist: pl
                    });
                });
            }
        }
    });
});

app.post('/api/1/pl/load', (req, res, next) => {
    Playlist.findOne({"title": req.body.playlist, "owner": req.body.owner}, (err, pl) => {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        }
        if (pl && pl != null) {
            Song.find({'_id': {$in: pl.tracks}}, (err, songs) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.message
                    });
                }
                return res.json({
                    success: true,
                    currentPlaylist: pl,
                    playlistSongs: songs
                });
            });
        }
    });
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
