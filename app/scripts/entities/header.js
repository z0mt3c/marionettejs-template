var App = require('application');
var Backbone = require('backbone');
var Picky = require('backbone.picky');
var _ = require('lodash');

module.exports = App.module('Entities', function (Entities, App, Backbone) {
    Entities.Header = Backbone.Model.extend({
        initialize: function () {
            var selectable = new Picky.Selectable(this);
            _.assign(this, selectable);
            this.select = selectable.select;
            this.deselect = selectable.deselect;
        }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
        model: Entities.Header,

        initialize: function () {
            var singleSelect = new Picky.SingleSelect(this);
            _.assign(this, singleSelect);
            this.select = singleSelect.select;
            this.deselect = singleSelect.deselect;
        }
    });

    var initializeHeaders = function () {
        Entities.headers = new Entities.HeaderCollection([
            { name: 'Start', url: '/start', navigationTrigger: 'default:start' },
            { name: 'Hello', url: '/hello/Name', navigationTrigger: ['default:hello', 'Name'] },
            { name: 'MasterDetail', url: '/masterdetail', navigationTrigger: 'masterdetail:start' },
            { name: 'Notifications', url: '/demo', navigationTrigger: 'demo:demo' }
        ]);
    };

    var API = {
        getHeaders: function () {
            if (Entities.headers === undefined) {
                initializeHeaders();
            }
            return Entities.headers;
        }
    };

    App.reqres.setHandler('header:entities', function () {
        return API.getHeaders();
    });
});