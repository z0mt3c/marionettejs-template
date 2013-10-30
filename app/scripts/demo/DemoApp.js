define(['application'], function (App) {
    App.module('DemoApp', function (DemoApp) {
        DemoApp.startWithParent = false;

        DemoApp.onStart = function () {
            console.log('starting DemoApp');
        };

        DemoApp.onStop = function () {
            console.log('stopping DemoApp');
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
                require(['demo/DemoController'], function (DemoController) {
                    executeAction(DemoController.showDemo, criterion);
                });
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

    return App.DemoAppRouter;
});
