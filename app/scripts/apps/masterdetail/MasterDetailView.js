define([
    'application',
    'backbone',
    'hbs!apps/masterdetail/templates/layout',
    'hbs!apps/masterdetail/templates/list',
    'hbs!apps/masterdetail/templates/detail',
    'hbs!apps/masterdetail/templates/listItem',
    'hbs!apps/masterdetail/templates/empty'
], function (App, Backbone, layoutTpl, listTpl, detailTpl, listItemTpl, emptyTpl) {
    var views = { };

    views.Layout = Backbone.Marionette.Layout.extend({
        template: layoutTpl,
        regions: {
            sideRegion: '#side-md-region',
            mainRegion: '#main-md-region'
        }
    });

    views.Empty = Backbone.Marionette.ItemView.extend({
        template: emptyTpl
    });

    views.Item = Backbone.Marionette.ItemView.extend({
        template: detailTpl
    });

    views.CollectionItem = Backbone.Marionette.ItemView.extend({
        template: listItemTpl,
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
            this.$el.attr('href', '/masterdetail/'+this.model.get('id'));

            if (this.model.selected) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
            }
        }
    });

    views.Collection = Backbone.Marionette.CompositeView.extend({
        template: listTpl,
        itemView: views.CollectionItem,
        itemViewContainer: 'div.list-group'
    });

    return views;
});
