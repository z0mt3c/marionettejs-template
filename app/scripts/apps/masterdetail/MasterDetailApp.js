define(['application', 'loglevel'], function (App, log) {
    App.module('MasterDetailApp', function (MasterDetailApp) {
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
                'masterdetail/:id': 'showStart'
            }
        });

        var API = {
            showStart: function (criterion) {
                require(['apps/masterdetail/MasterDetailController'], function (Controller) {
                    executeAction(Controller.showStart, criterion);
                    App.execute('set:active:header', '/masterdetail');
                });
            }
        };

        App.on('masterdetail:start', function () {
            App.navigate('/masterdetail');
            API.showStart();
        });

        App.on('masterdetail:detail', function (id) {
            App.navigate('/masterdetail/' + id);
            API.showStart(id);
        });

        App.addInitializer(function () {
            new MasterDetailAppRouter.Router({
                controller: API
            });
        });
    });

    return App.MasterDetailAppRouter;
});
