var App = require('application');
var View = require('./DemoView');

module.exports = {
    showDemo: function () {
        var view = new View.Demo({});
        App.mainRegion.show(view);
    }
};

