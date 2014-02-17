require.config({

    baseUrl: '/scripts',

    /* starting point for application */
    deps: ['backbone.marionette', 'bootstrap', 'main'],


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

        bootstrap: {
            deps: ['jquery', 'bootstrap.modal'],
            exports: 'jquery'
        }
    },

    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash.underscore',
        clientconfig: '../bower_components/clientconfig/clientconfig.bundle',

        /* alias all marionette libs */
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
        'backbone.picky': '../bower_components/backbone.picky/lib/amd/backbone.picky',

        /* alias the bootstrap js lib */
        'bootstrap': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/bootstrap',
        'bootstrap.affix': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/affix',
        'bootstrap.alert': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/alert',
        'bootstrap.button': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/button',
        'bootstrap.carousel': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/carousel',
        'bootstrap.collapse': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/collapse',
        'bootstrap.dropdown': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/dropdown',
        'bootstrap.modal': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/modal',
        'bootstrap.popover': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/popover',
        'bootstrap.scrollspy': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/scrollspy',
        'bootstrap.tab': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/tab',
        'bootstrap.tooltip': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/tooltip',
        'bootstrap.transition': '../bower_components/twbs-bootstrap-sass/vendor/assets/javascripts/bootstrap/transition',

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
