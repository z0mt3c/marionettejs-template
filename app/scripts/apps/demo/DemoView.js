define([
    'application',
    'backbone',
    'hbs!apps/demo/template/demo'
], function (App, Backbone, demoTpl) {
    var views = { };

    views.Demo = Backbone.Marionette.ItemView.extend({
        template: demoTpl
    });

    return views;
});
