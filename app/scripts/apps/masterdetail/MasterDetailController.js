define(['application', 'apps/masterdetail/MasterDetailView'], function (App, View) {
    function getLayout() {
        var layout = App.mainRegion.currentView instanceof View.Layout ? App.mainRegion.currentView : new View.Layout();
        return layout;
    }

    return {
        showSide: function (id) {
            var layout = getLayout();

            require(['entities/masterdetail'], function () {
                var fetchEntities = App.request('masterdetail:entities');

                $.when(fetchEntities).done(function (entities) {
                    var view = new View.ManufacturerList({
                        collection: entities
                    });

                    if (id) {
                        entities.get(id).select();
                    }

                    entities.on('select:one', function (model) {
                        App.trigger('masterdetail:detail', model.get('id'));
                    });


                    layout.sideRegion.show(view);
                });
            });
        },

        showDetail: function (id) {
            var layout = getLayout();

            layout.on('show', function () {
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

            App.mainRegion.show(layout);
        },

        showStart: function () {
            var layout = getLayout();

            layout.on('show', function () {
                layout.mainRegion.show(new View.Empty({}));
            });
            App.mainRegion.show(layout);
        }
    };
});