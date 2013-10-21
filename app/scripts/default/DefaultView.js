define([
    "application",
    "backbone",
    "hbs!default/template/start",
    "hbs!default/template/hello"
], function (App, Backbone, startTpl, helloTpl) {
    var views = { };

    views.Start = Backbone.Marionette.ItemView.extend({
        template: startTpl,
        triggers: {
            'click .openModal': 'showModal'
        }
    });

    views.Hello = Backbone.Marionette.ItemView.extend({
        template: helloTpl
    });

    return views;
});
