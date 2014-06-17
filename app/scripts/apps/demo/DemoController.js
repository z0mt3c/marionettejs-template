var App = require('application');
var Backbone = require('backbone');
var View = require('./DemoView');
require('../../templates/helpers/eachProperty');

module.exports = {
    showDemo: function () {
        var view = new View.Demo({ model: new Backbone.Model({
            test: { a: 'b', d: 'e' }
        })});
        App.mainRegion.show(view);
    }
};

