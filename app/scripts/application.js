define([
    'backbone',
    'communicator',
    'clientconfig',
    'helper/dialogRegion',
    'hbs!template/main'
],
    function (Backbone, Communicator, config, dialogRegion, mainTmpl) {
        'use strict';
        console.log('Config loaded:');
        console.log(config);

        var App = new Backbone.Marionette.Application();

        /* Add application regions here */
        App.addRegions({
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
            $(document).on('click', 'a:not([data-bypass])', function (e) {
                var href = $(this).attr('href');
                var protocol = this.protocol + '//';

                if (href.slice(protocol.length) !== protocol) {
                    e.preventDefault();
                    App.navigate(href, true);
                }
            });
        };

        App.on('initialize:after', function () {
            if (Backbone.history) {
                require(['default/DefaultApp', 'demo/DemoApp'], function () {
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