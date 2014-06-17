var App = require('application');
var log = require('loglevel');
var application = require('application');
var Controller = require('./DemoController');

module.exports = App.module('DemoApp', function (DemoApp) {
    DemoApp.startWithParent = false;

    DemoApp.onStart = function () {
        log.debug('starting DemoApp');
    };

    DemoApp.onStop = function () {
        log.debug('stopping DemoApp');
    };
});

App.module('Routers.DemoApp', function (DemoAppRouter, App, Backbone) {
    var executeAction = function (action, arg) {
        App.startSubApp('DemoApp');
        action(arg);
        //App.execute('set:active:header', 'contacts');
    };

    DemoAppRouter.Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            'demo': 'showDemo'
        }
    });

    var API = {
        showDemo: function (criterion) {
            executeAction(Controller.showDemo, criterion);
            App.execute('set:active:header', '/demo');
        }
    };

    App.on('demo:demo', function () {
        App.navigate('demo');
        API.showDemo();
    });

    App.addInitializer(function () {
        new DemoAppRouter.Router({
            controller: API
        });
    });
});