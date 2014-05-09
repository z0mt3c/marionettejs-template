define([
    'application',
    'backbone',
    'hbs!apps/demo/templates/demo'
], function (App, Backbone, demoTpl) {
    var views = { };

    views.Demo = Backbone.Marionette.ItemView.extend({
        template: demoTpl,
        events: {
            'click .push-notification': 'doNotify'
        },
        doNotify: function (e) {
            var target = $(e.currentTarget);
            App.trigger('notification:add', { type: target.data('type'), title: target.data('title'), description: target.data('description') });
        }
    });

    return views;
});
