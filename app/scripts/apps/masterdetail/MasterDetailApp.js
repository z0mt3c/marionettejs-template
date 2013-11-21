define(['application', 'loglevel'], function (App, log) {
    App.module('MasterDetailApp', function (MasterDetailApp) {
        MasterDetailApp.startWithParent = false;

        MasterDetailApp.onStart = function () {
            log.debug('starting MasterDetailApp');

            /*
             // possible but doesnt pass id
             require(['apps/masterdetail/MasterDetailController'], function (Controller) {
             Controller.showSide();
             });
             */
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
                require(['apps/masterdetail/MasterDetailController'], function (Controller) {
                    executeAction(Controller.showStart);
                    executeAction(Controller.showSide);
                    App.execute('set:active:header', '/masterdetail');
                });
            },
            showDetail: function (id) {
                require(['apps/masterdetail/MasterDetailController'], function (Controller) {
                    executeAction(Controller.showDetail, id);
                    executeAction(Controller.showSide, id);
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
            API.showDetail(id);
        });

        App.addInitializer(function () {
            new MasterDetailAppRouter.Router({
                controller: API
            });
        });
    });

    return App.MasterDetailAppRouter;
});
