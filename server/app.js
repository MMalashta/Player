var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

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

app.use((req, res, next) => {
    console.log(req.path.includes('api/1'))
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

app.get('/api/1/user/auth', (req, res, next) => {
    res.json({
        success: true,
        data: {
            login: "new-use"
        }
    })
});

app.get('/api/1/tracks', (req, res, next) => {
    res.json({
        success: true,
        data: ["Track 1"]
    })
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
