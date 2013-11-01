define(['application', 'loglevel'], function (App, log) {
    App.module('DefaultApp', function (DefaultApp) {
        DefaultApp.startWithParent = false;

        DefaultApp.onStart = function () {
            log.debug('starting DefaultApp');
        };

        DefaultApp.onStop = function () {
            log.debug('stopping DefaultApp');
        };
    });

    App.module('Routers.DefaultApp', function (DefaultAppRouter, App, Backbone) {
        var executeAction = function (action, arg) {
            App.startSubApp('DefaultApp');
            action(arg);
        };

        DefaultAppRouter.Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                'start': 'showStart',
                'hello/:name': 'showHello'
            }
        });

        var API = {
            showStart: function (criterion) {
                require(['apps/default/DefaultController'], function (DefaultController) {
                    App.execute('set:active:header', '/start');
                    executeAction(DefaultController.showStart, criterion);
                });
            },

            showHello: function (name) {
                require(['apps/default/DefaultController'], function (DefaultController) {
                    App.execute('set:active:header', '/hello/Name');
                    executeAction(DefaultController.showHello, name);
                });
            }
        };

        App.on('default:start', function () {
            App.navigate('start');
            API.showStart();
        });

        App.on('default:hello', function (name) {
            App.navigate('hello/' + name);
            API.showHello(name);
        });

        App.addInitializer(function () {
            new DefaultAppRouter.Router({
                controller: API
            });
        });
    });

    return App.DefaultAppRouter;
});
