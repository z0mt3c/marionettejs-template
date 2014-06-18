var Marionette = require('backbone.marionette');
var views = module.exports = { };

views.Start = Marionette.ItemView.extend({
    template: require('./templates/start.hbs'),
    triggers: {
        'click .open-dialog': 'dialog:show'
    }
});

views.Hello = Marionette.ItemView.extend({
    template: require('./templates/hello.hbs')
});

views.Dialog = Marionette.ItemView.extend({
    template: require('./templates/dialog.hbs'),
    triggers: {
        'click .dialog-close': 'dialog:destroy'
    }
});