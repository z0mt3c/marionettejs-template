var App = require('../../application'),
    Marionette = require('marionette'),
    startTpl = require('./templates/start.hbs'),
    dialogTpl = require('./templates/dialog.hbs'),
    helloTpl = require('./templates/hello.hbs');

var views = { };

views.Start = Marionette.ItemView.extend({
    template: startTpl,
    triggers: {
        'click .open-dialog': 'dialog:show'
    }
});

views.Hello = Marionette.ItemView.extend({
    template: helloTpl
});

views.Dialog = Marionette.ItemView.extend({
    template: dialogTpl,
    triggers: {
        'click .dialog-close': 'dialog:close'
    }
});

module.exports = views;
