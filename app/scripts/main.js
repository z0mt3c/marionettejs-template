require([
	'backbone',
    'backbone.marionette',
	'application',
    'apps/header/HeaderApp',
    'apps/notification/NotificationApp'
],
function (Backbone, Marionette, App) {
    'use strict';

	App.start();
});
