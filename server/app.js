'use strict';

var config = require('../config');
var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var _ = require('lodash');
var app = express();

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.compress());
    app.set('port', process.env.PORT || config.server.port || 9000);
    app.set('view engine', 'handlebars');

    var configMiddleware = function(req, res, next) {
        res.cookie('config', JSON.stringify(config.clientAppSettings), { maxAge: 60000, httpOnly: false});
        next();
    };

    if (config.options.livereload) {
        app.use(require('connect-livereload')({ port: config.options.livereload }));
    }

    if (config.options.templates) {
        app.set('views', __dirname + config.path.public + '/scripts/views');
        app.use(express.static(path.join(__dirname, '../.tmp')));
    }

    app.use(express.static(path.join(__dirname, config.path.public)));

    app.get('/api/hello/:name', function (req, res) {
        res.json({'hello': req.params.name});
    });

    // route index.html
    var catchAllNonStatic = new RegExp('^(?!\/(' + config.path.static.join('|') + '))[^.]*$');
    app.get(catchAllNonStatic, configMiddleware, function (req, res) {
        res.sendfile(path.join(__dirname, config.path.public + '/index.html'));
    });
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
