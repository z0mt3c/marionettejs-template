define([
    'application',
    'backbone',
    'hbs!apps/demo/templates/demo'
], function (App, Backbone, demoTpl) {
    var views = { };

    views.Demo = Backbone.Marionette.ItemView.extend({
        template: demoTpl
    });

    return views;
});
