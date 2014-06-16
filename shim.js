module.exports = {
    lodash: {
        exports: '_'
    },
    'backbone': {
        exports: 'Backbone',
        depends: {
            lodash: '_',
            'jquery': 'jQuery'
        }
    },
    'marionette': {
        exports: 'Marionette',
        depends: {
            lodash: '_',
            'jquery': 'jQuery',
            'backbone': 'Backbone'
        }
    }
};