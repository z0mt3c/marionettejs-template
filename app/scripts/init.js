require.config({

    baseUrl: '/scripts',

    /* starting point for application */
    deps: ['backbone.marionette', 'main'],


    shim: {
        Handlebars: {
            exports: 'Handlebars'
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },

        'bootstrap.affix': { deps: ['jquery'] },
        'bootstrap.alert': { deps: ['jquery'] },
        'bootstrap.button': { deps: ['jquery'] },
        'bootstrap.carousel': { deps: ['jquery'] },
        'bootstrap.collapse': { deps: ['jquery'] },
        'bootstrap.dropdown': { deps: ['jquery'] },
        'bootstrap.modal': { deps: ['jquery'] },
        'bootstrap.popover': { deps: ['jquery'] },
        'bootstrap.scrollspy': { deps: ['jquery'] },
        'bootstrap.tab': { deps: ['jquery'] },
        'bootstrap.tooltip': { deps: ['jquery'] },
        'bootstrap.transition': { deps: ['jquery'] }
    },

    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash.underscore',
        clientconfig: '../bower_components/clientconfig/clientconfig.bundle',

        /* alias all marionette libs */
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/backbone.babysitter',
        'backbone.picky': '../bower_components/backbone.picky/lib/amd/backbone.picky',

        /* alias the bootstrap js lib */
        'bootstrap.affix': '../bower_components/bootstrap/js/affix',
        'bootstrap.alert': '../bower_components/bootstrap/js/alert',
        'bootstrap.button': '../bower_components/bootstrap/js/button',
        'bootstrap.carousel': '../bower_components/bootstrap/js/carousel',
        'bootstrap.collapse': '../bower_components/bootstrap/js/collapse',
        'bootstrap.dropdown': '../bower_components/bootstrap/js/dropdown',
        'bootstrap.modal': '../bower_components/bootstrap/js/modal',
        'bootstrap.popover': '../bower_components/bootstrap/js/popover',
        'bootstrap.scrollspy': '../bower_components/bootstrap/js/scrollspy',
        'bootstrap.tab': '../bower_components/bootstrap/js/tab',
        'bootstrap.tooltip': '../bower_components/bootstrap/js/tooltip',
        'bootstrap.transition': '../bower_components/bootstrap/js/transition',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs',
        loglevel: '../bower_components/loglevel/lib/loglevel'
    },

    hbs: {
        disableI18n: true
    }
});
