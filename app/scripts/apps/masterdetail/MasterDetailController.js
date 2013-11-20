define(['application', 'apps/masterdetail/MasterDetailView'], function (App, View) {

    function loadLayout() {
        var layout = new View.Layout();
        App.mainRegion.show(layout);
    };

    return {
        showStart: function (id) {
            var layout = new View.Layout();

            layout.on("show", function () {
                layout.mainRegion.show(new View.Empty({}));
            });

            require(['entities/masterdetail'], function () {
                var fetchEntities = App.request('masterdetail:entities');

                function loadDetail(id) {
                    var fetchEntity = App.request('masterdetail:entity', id);

                    $.when(fetchEntity).done(function (entity) {
                        var detailView = new View.Detail({
                            model: entity
                        });
                        layout.mainRegion.show(detailView);
                    });
                }

                $.when(fetchEntities).done(function (entities) {
                    var view = new View.ManufacturerList({
                        collection: entities
                    });

                    entities.on('select:one', function (model) {
                        loadDetail(model.get('id'));
                    });

                    if (id) {
                        entities.get(id).select();
                    }

                    layout.sideRegion.show(view);
                });
            });

            App.mainRegion.show(layout);
        },

        showDetail: function (id) {

        }
    };
});

