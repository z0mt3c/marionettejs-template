define(['application', 'apps/masterdetail/MasterDetailView'], function (App, View) {
    return {
        showStart: function (id) {
            var layout = new View.Layout();

            layout.on('show', function () {
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
                        var id = model.get('id');
                        // TODO: ugly - should trigger event
                        App.navigate('/masterdetail/' + id);
                        loadDetail(id);
                    });

                    if (id) {
                        entities.get(id).select();
                    }

                    layout.sideRegion.show(view);
                });
            });

            App.mainRegion.show(layout);
        }
    };
});

