var Marionette = require('backbone.marionette');
var views = module.exports = {};

views.Header = Marionette.ItemView.extend({
    template: require('./templates/listItem.hbs'),
    tagName: 'li',

    events: {
        'click a': 'navigate'
    },

    navigate: function (e) {
        e.preventDefault();
        this.trigger('navigate', this.model);
    },

    onRender: function () {
        if (this.model.selected) {
            // add class so Bootstrap will highlight the active entry in the navbar
            this.$el.addClass('active');
        }
    }

});

views.Headers = Marionette.CompositeView.extend({
    template: require('./templates/list.hbs'),
    className: 'navbar navbar-default navbar-fixed-top',
    itemView: views.Header,
    itemViewContainer: 'ul',

    events: {
        'click a.brand': 'brandClicked'
    },

    brandClicked: function (e) {
        e.preventDefault();
        this.trigger('brand:clicked');
    }
});