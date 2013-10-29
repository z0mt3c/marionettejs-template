define(['application'], function (App) {
    App.module('DefaultApp', function (DefaultApp) {
        DefaultApp.startWithParent = false;

        DefaultApp.onStart = function () {
            console.log('starting DefaultApp');
        };

        DefaultApp.onStop = function () {
            console.log('stopping DefaultApp');
        };
    });

    App.module('Routers.DefaultApp', function (DefaultAppRouter, App, Backbone) {
        var executeAction = function (action, arg) {
            App.startSubApp('DefaultApp');
            action(arg);
            //App.execute('set:active:header', 'contacts');
        };

        DefaultAppRouter.Router = Backbone.Marionette.AppRouter.extend({
            appRoutes: {
                'start': 'showStart',
                'hello/:name': 'showHello'
            }
        });

        var API = {
            showStart: function (criterion) {
                require(['default/DefaultController'], function (DefaultController) {
                    executeAction(DefaultController.showStart, criterion);
                });
            },

            showHello: function (name) {
                require(['default/DefaultController'], function (DefaultController) {
                    executeAction(DefaultController.showHello, name);
                });
            }
        };

        App.on('default:start', function () {
            App.navigate('start');
            API.showStart();
        });

        App.on('test:hello', function (name) {
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
