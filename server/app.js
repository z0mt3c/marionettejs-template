'use strict';

var logger = require('winston');
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { timestamp: true })

var config = require('../config');
var express = require('express');
var http = require('http');
var path = require('path');
var hbs = require('express-hbs');
var _ = require('lodash');
var app = express();

app.configure(function () {
    //app.use(express.json());
    //app.use(express.urlencoded());
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

    /*
     * Master detail example
     */
    var masterDetailData = [
        {id: 1, title: 'Apple', devices: ['iPhone 5c', 'iPhone 5s']},
        {id: 2, title: 'Samsung', devices: ['Galaxy S3', 'Galaxy S4']},
        {id: 3, title: 'HTC', devices: ['One', 'One Mini', 'One Max']}
    ];

    app.get('/api/masterdetail', function (req, res) {
        res.json(_.map(masterDetailData, function(e) {
            return {id: e.id, title: e.title, count: e.devices.length};
        }));
    });

    app.get('/api/masterdetail/:id', function (req, res) {
        res.json(masterDetailData[req.params.id-1]);
    });

    // route index.html
    var catchAllNonStatic = new RegExp('^(?!\/(' + config.path.static.join('|') + '))[^.]*$');
    app.get(catchAllNonStatic, configMiddleware, function (req, res) {
        res.sendfile(path.join(__dirname, config.path.public + '/index.html'));
    });
});

http.createServer(app).listen(app.get('port'), function () {
    logger.log('info', 'Server listening on port %s', app.get('port'));
});
