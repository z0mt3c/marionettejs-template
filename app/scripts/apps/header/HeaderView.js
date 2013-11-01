define(['application',
    'backbone',
    'hbs!apps/header/templates/list',
    'hbs!apps/header/templates/listItem'],
    function (App, Backbone, listTpl, listItemTpl) {
        var views = {};

        views.Header = Backbone.Marionette.ItemView.extend({
            template: listItemTpl,
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

        views.Headers = Backbone.Marionette.CompositeView.extend({
            template: listTpl,
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
        return views;
    });
