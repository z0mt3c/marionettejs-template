define(['application', 'apps/notification/NotificationController'], function (App, NotificationController) {
    App.module('NotificationApp', function (NotificationApp) {
        var API = {
            showNotifications: function () {
                NotificationController.showNotifications();
            },
            addNotification: function (data) {
                NotificationController.addNotification(data);
            }
        };

        NotificationApp.on('start', function () {
            API.showNotifications();

            App.on('notification:add', function (data) {
                API.addNotification(data);
            });
        });
    });



    return App.NotificationApp;
});
