define(['application', 'apps/masterdetail/MasterDetailView'], function (App, View) {
    function getLayout() {
        if (App.mainRegion.currentView && App.mainRegion.currentView instanceof View.Layout) {
            // layout already loaded
            return App.mainRegion.currentView;
        } else {
            var layout = new View.Layout();
            App.mainRegion.show(layout);
            return layout;
        }
    }

    return {
        showSide: function (id) {
            var layout = getLayout();

            if (layout.sideRegion.currentView) {
                // side already loaded
                return;
            }

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

            require(['entities/masterdetail'], function () {
                var fetchEntity = App.request('masterdetail:entity', id);
                $.when(fetchEntity).done(function (entity) {
                    var detailView = new View.Detail({
                        model: entity
                    });

                    layout.mainRegion.show(detailView);
                });
            });
        },

        showStart: function () {
            var layout = getLayout();
            layout.mainRegion.show(new View.Empty({}));
        }
    };
});