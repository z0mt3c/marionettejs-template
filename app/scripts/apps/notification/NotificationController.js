define(['application', 'apps/notification/NotificationView', 'underscore'], function (App, View, _) {
    return {
        showNotifications: function () {
            require(['entities/notifications'], function () {
                var notifications = App.request('notification:entities');
                var notificationsView = new View.Notifications({
                    collection: notifications
                });
                App.notificationRegion.show(notificationsView);
            });
        },
        addNotification: function(data) {
            require(['entities/notifications'], function () {
                var notifications = App.request('notification:entities');
                notifications.add(data);
            });
        }
    };
});
