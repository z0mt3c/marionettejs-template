var App = require('application');
var log = require('loglevel');
var Controller = require('./MasterDetailController');

module.exports = App.module('MasterDetailApp', function (MasterDetailApp) {
    MasterDetailApp.startWithParent = false;

    MasterDetailApp.onStart = function () {
        log.debug('starting MasterDetailApp');
    };

    MasterDetailApp.onStop = function () {
        log.debug('stopping MasterDetailApp');
    };
});

App.module('Routers.MasterDetailApp', function (MasterDetailAppRouter, App, Backbone) {
    var executeAction = function (action, arg) {
        App.startSubApp('MasterDetailApp');
        action(arg);
    };

    MasterDetailAppRouter.Router = Backbone.Marionette.AppRouter.extend({
        appRoutes: {
            'masterdetail': 'showStart',
            'masterdetail/:id': 'showDetail'
        }
    });

    var API = {
        showStart: function () {
            executeAction(Controller.showStart);
            App.trigger('masterdetail:side:select');
            App.execute('set:active:header', '/masterdetail');
        },
        showDetail: function (id) {
            executeAction(Controller.showDetail, id);
            App.trigger('masterdetail:side:select', id);
            App.execute('set:active:header', '/masterdetail');
        }
    };

    App.on('masterdetail:start', function () {
        App.navigate('/masterdetail');
        API.showStart();
    });

    App.on('masterdetail:detail', function (id) {
        App.navigate('/masterdetail/' + id);
        API.showDetail(id);
    });

    App.addInitializer(function () {
        new MasterDetailAppRouter.Router({
            controller: API
        });
    });
});