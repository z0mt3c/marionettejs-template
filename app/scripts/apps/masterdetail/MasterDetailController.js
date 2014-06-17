var App = require('application');
var View = require('./MasterDetailView');
var $ = require('jquery');
require('../../entities/masterdetail');

function getSideView(preselectedId) {
    var defer = $.Deferred();
    var fetchEntities = App.request('masterdetail:entities');

    $.when(fetchEntities).done(function (entities) {
        function selectItem(id) {
            if (id) {
                //entities.get(id).select();
            } else {
                //entities.deselect();
            }
        }

        var view = new View.Collection({
            collection: entities
        });

        selectItem(preselectedId);

        view.listenTo(entities, 'select:one', function (model) {
            App.trigger('masterdetail:detail', model.get('id'));
        });

        view.listenTo(App, 'masterdetail:side:select', selectItem);

        defer.resolve(view);
    });

    return defer.promise();
}

function getLayout(id) {
    var defer = $.Deferred();

    if (App.mainRegion.currentView && App.mainRegion.currentView instanceof View.Layout) {
        defer.resolve(App.mainRegion.currentView);
    } else {
        var layout = new View.Layout();
        var loadSide = getSideView(id);

        $.when(loadSide).done(function (sideView) {
            App.mainRegion.show(layout);
            layout.sideRegion.show(sideView);
            defer.resolve(layout);
        });
    }

    return defer.promise();
}

var controller = module.exports = {
    showDetail: function (id) {
        var loadLayout = getLayout(id);
        var fetchEntity = App.request('masterdetail:entity', id);

        $.when(loadLayout, fetchEntity).done(function (layout, entity) {
            var detailView = new View.Item({
                model: entity
            });

            layout.mainRegion.show(detailView);
        });
    },
    showStart: function () {
        var loadLayout = getLayout();

        $.when(loadLayout).done(function (layout) {
            layout.mainRegion.show(new View.Empty({}));
        });
    }
};