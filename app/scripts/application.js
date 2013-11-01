define([
    'backbone',
    'communicator',
    'clientconfig',
    'loglevel',
    'helper/dialogRegion',
    'hbs!template/main'
],
    function (Backbone, Communicator, config, log, dialogRegion, mainTmpl) {
        'use strict';

        // set log level - fallback: SILENT (5)
        log.setLevel(config.loglevel || 5); //
        log.debug('Configuration loaded:', config);

        var App = new Backbone.Marionette.Application();

        /* Add application regions here */
        App.addRegions({
            headerRegion: "#header-region",
            navigationRegion: '#navigation-region',
            mainRegion: '#main-region',
            dialogRegion: dialogRegion
        });

        App.navigate = function (route, options) {
            if (!options) {
                options = {};
            }

            Backbone.history.navigate(route, options);
        };

        App.getCurrentRoute = function () {
            return Backbone.history.fragment;
        };

        App.startSubApp = function (appName, args) {
            var currentApp = appName ? App.module(appName) : null;
            if (App.currentApp === currentApp) {
                return;
            }

            if (App.currentApp) {
                App.currentApp.stop();
            }

            App.currentApp = currentApp;
            if (currentApp) {
                currentApp.start(args);
            }
        };

        /* Add initializers here */
        App.addInitializer(function () {
            Communicator.mediator.trigger("app:start");
            document.body.innerHTML = mainTmpl({});
        });

        var initializeRouter = function () {
            Backbone.history.start({ pushState: true });

        };

        App.on('initialize:after', function () {
            if (Backbone.history) {
                require(['apps/default/DefaultApp', 'apps/demo/DemoApp'], function () {
                    initializeRouter();

                    if (App.getCurrentRoute() === '') {
                        App.trigger('default:start');
                    }
                });
            }

            $('.nav a').on('click', function () {
                if ($('.navbar-collapse').hasClass('in')) {
                    $('.navbar-toggle').click();
                }
            });
        });

        return App;
    });