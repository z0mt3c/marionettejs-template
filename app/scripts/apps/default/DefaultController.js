define(['application', 'apps/default/DefaultView'], function (App, View) {
    return {
        showStart: function () {
            var view = new View.Start({});
            view.on('dialog:show', function () {
                var dialog = new View.Dialog({});
                App.dialogRegion.show(dialog);
            });
            App.mainRegion.show(view);
        },

        showHello: function (name) {
            require(['entities/default'], function () {
                var fetchEntity = App.request('test:hello', name);
                $.when(fetchEntity).done(function (entity) {
                    var view = new View.Hello({
                        model: entity
                    });
                    App.mainRegion.show(view);
                });
            });
        }
    };
});

