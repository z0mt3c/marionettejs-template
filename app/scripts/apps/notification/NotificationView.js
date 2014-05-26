define(['application',
        'backbone',
        'hbs!apps/notification/templates/list',
        'hbs!apps/notification/templates/listItem'],
    function (App, Backbone, listTpl, listItemTpl) {
        var views = {};

        views.Notification = Backbone.Marionette.ItemView.extend({
            template: listItemTpl,
            tagName: 'li',
            className: 'notification-item list-group-item animated fadeInRightBig fast',
            events: {
            },
            onRender: function () {
                var self = this;
                this.$el.addClass('list-group-item-' + this.model.get('type'));
                var timeout = this.model.get('timeout');

                setTimeout(function () {
                    self.$el.slideUp('fast', function () {
                        self.model.destroy();
                    });
                }, timeout);

                this.$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    self.$el.removeClass('animated bounceInRight');
                });
            }
        });

        views.Notifications = Backbone.Marionette.CompositeView.extend({
            template: listTpl,
            className: 'notifications',
            itemView: views.Notification,
            itemViewContainer: 'ul',
            events: {
            }
        });

        return views;
    });
