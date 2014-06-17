var App = require('application');
var Picky = require('backbone.picky');
var _ = require('lodash');
var $ = require('jquery');

module.exports = App.module('Entities', function (Entities, App, Backbone) {
    Entities.MasterDetail = Backbone.Model.extend({
        urlRoot: '/api/masterdetail',
        initialize: function () {
            var selectable = new Picky.Selectable(this);
            _.extend(this, selectable);
            this.select = selectable.select;
            this.deselect = selectable.deselect;
        }
    });

    Entities.MasterDetailCollection = Backbone.Collection.extend({
        model: Entities.MasterDetail,
        url: '/api/masterdetail',

        initialize: function () {
            var singleSelect = new Picky.SingleSelect(this);
            _.extend(this, singleSelect);
            this.select = singleSelect.select;
            this.deselect = singleSelect.deselect;
        }
    });

    var API = {
        getEntities: function () {
            var entities = new Entities.MasterDetailCollection();
            var defer = $.Deferred();

            entities.fetch({
                success: function (data) {
                    defer.resolve(data);
                }
            });

            return defer.promise();
        },
        getEntity: function (id) {
            var entity = new Entities.MasterDetail({id: id});
            var defer = $.Deferred();

            entity.fetch({
                success: function (data) {
                    defer.resolve(data);
                }
            });

            return defer.promise();
        }
    };

    App.reqres.setHandler('masterdetail:entities', function () {
        return API.getEntities();
    });

    App.reqres.setHandler('masterdetail:entity', function (id) {
        return API.getEntity(id);
    });
});