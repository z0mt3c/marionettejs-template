define(['application', 'apps/header/HeaderController'], function (App, HeaderController) {
    App.module('HeaderApp', function (HeaderApp) {
        var API = {
            listHeader: function () {
                HeaderController.listHeader();
            }
        };

        App.commands.setHandler('set:active:header', function (name) {
            HeaderController.setActiveHeader(name);
        });

        HeaderApp.on('start', function () {
            API.listHeader();
        });
    });

    return App.HeaderApp;
});
