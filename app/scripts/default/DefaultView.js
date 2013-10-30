define([
    'application',
    'backbone',
    'hbs!default/template/start',
    'hbs!default/template/dialog',
    'hbs!default/template/hello'
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
