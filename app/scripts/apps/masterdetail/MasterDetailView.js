var Marionette = require('backbone.marionette');
var views = module.exports = { };

views.Layout = Marionette.Layout.extend({
    template: require('./templates/layout.hbs'),
    regions: {
        sideRegion: '#md-side',
        mainRegion: '#md-main'
    }
});

views.Empty = Marionette.ItemView.extend({
    template: require('./templates/empty.hbs')
});

views.Item = Marionette.ItemView.extend({
    template: require('./templates/detail.hbs')
});

views.CollectionItem = Marionette.ItemView.extend({
    template: require('./templates/listItem.hbs'),
    tagName: 'a',
    className: 'list-group-item',
    attributes: {
        href: '#'
    },
    events: {
        'click': 'navigate'
    },
    modelEvents: {
        'selected': 'onRender',
        'deselected': 'onRender'
    },
    navigate: function (e) {
        e.preventDefault();
        this.model.select();
    },
    onRender: function () {
        this.$el.attr('href', '/masterdetail/' + this.model.id);

        if (this.model.selected) {
            this.$el.addClass('active');
        } else {
            this.$el.removeClass('active');
        }
    }
});

views.Collection = Marionette.CompositeView.extend({
    template: require('./templates/list.hbs'),
    itemView: views.CollectionItem,
    itemViewContainer: 'div.list-group'
});
