var App = require('application');
var $ = require('jquery');
var Marionette = require('backbone.marionette');
var views = module.exports = { };

views.Demo = Marionette.ItemView.extend({
    template: require('./templates/demo.hbs'),
    events: {
        'click .push-notification': 'doNotify'
    },
    doNotify: function (e) {
        var target = $(e.currentTarget);
        App.trigger('notification:add', { type: target.data('type'), title: target.data('title'), description: target.data('description') });
    }
});