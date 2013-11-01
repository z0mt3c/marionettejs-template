define(['application', 'apps/demo/DemoView'], function (App, View) {
    return {
        showDemo: function () {
            var view = new View.Demo({});
            App.mainRegion.show(view);
        }
    };
});

