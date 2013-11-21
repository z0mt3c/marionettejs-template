define(['application', 'apps/masterdetail/MasterDetailView'], function (App, View) {
    function getLayout() {
        var defer = $.Deferred();

        if (App.mainRegion.currentView && App.mainRegion.currentView instanceof View.Layout) {
            defer.resolve(App.mainRegion.currentView);
        } else {
            var layout = new View.Layout();

            require(['entities/masterdetail'], function () {
                var fetchEntities = App.request('masterdetail:entities');

                $.when(fetchEntities).done(function (entities) {
                    var view = new View.ManufacturerList({
                        collection: entities
                    });

                    entities.on('select:one', function (model) {
                        App.trigger('masterdetail:detail', model.get('id'));
                    });

                    App.mainRegion.show(layout);
                    layout.sideRegion.show(view);

                    defer.resolve(layout);
                });
            });
        }

        return defer.promise();
    }

    var controller = {};

    controller.showDetail = function (id) {
        var loadLayout = getLayout();

        $.when(loadLayout).done(function (layout) {
            require(['entities/masterdetail'], function () {
                var fetchEntity = App.request('masterdetail:entity', id);
                $.when(fetchEntity).done(function (entity) {
                    var detailView = new View.Detail({
                        model: entity
                    });

                    layout.mainRegion.show(detailView);
                });
            });
        });
    };

    controller.showStart = function () {
        var loadLayout = getLayout();

        $.when(loadLayout).done(function (layout) {
            layout.mainRegion.show(new View.Empty({}));
        });
    };

    return controller;
});