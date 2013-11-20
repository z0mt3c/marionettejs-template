define([
    'application',
    'backbone',
    'hbs!apps/default/templates/start',
    'hbs!apps/default/templates/dialog',
    'hbs!apps/default/templates/hello'
], function (App, Backbone, startTpl, dialogTpl, helloTpl) {
    var views = { };

    views.Start = Backbone.Marionette.ItemView.extend({
        template: startTpl,
        triggers: {
            'click .open-dialog': 'dialog:show'
        }
    });

    views.Hello = Backbone.Marionette.ItemView.extend({
        template: helloTpl
    });

    views.Dialog = Backbone.Marionette.ItemView.extend({
        template: dialogTpl,
        triggers: {
            'click .dialog-close': 'dialog:close'
        }
    });

    return views;
});
