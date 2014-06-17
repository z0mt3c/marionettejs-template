/*
 'backbone',
 'backbone.marionette',
 'application',
 'apps/header/HeaderApp',
 'apps/notification/NotificationApp'
 */
var App = require('application');

require('./apps/header/HeaderApp');
require('./apps/default/DefaultApp');
require('./apps/demo/DemoApp');
require('./apps/masterdetail/MasterDetailApp');
require('./apps/notification/NotificationApp');

App.start();