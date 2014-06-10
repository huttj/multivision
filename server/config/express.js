var express         = require('express'),
    morgan          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    stylus          = require('stylus'),
    passport        = require('passport');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));
    app.use(morgan('dev'));
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(session({secret: 'multi vision unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
};