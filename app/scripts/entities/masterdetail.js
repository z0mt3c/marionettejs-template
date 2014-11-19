var App = require('application');
var BackboneSelect = require('backbone.select');
var $ = require('jquery');

module.exports = App.module('Entities', function (Entities, App, Backbone) {
    Entities.MasterDetail = Backbone.Model.extend({
        urlRoot: '/api/masterdetail',
		initialize: function () {
			Backbone.Select.Me.applyTo( this );
		}
    });

    Entities.MasterDetailCollection = Backbone.Collection.extend({
        model: Entities.MasterDetail,
        url: '/api/masterdetail',

		initialize: function(models) {
			BackboneSelect.One.applyTo(this, models);
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
