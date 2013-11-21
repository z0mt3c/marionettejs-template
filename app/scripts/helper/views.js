define(['application', 'hbs!helper/templates/loading'], function(App, loadingTpl){
    App.module('Common.Views', function (Views, App, Backbone) {
        Views.Loading = Backbone.Marionette.ItemView.extend({
            template: loadingTpl,

            initialize: function(options){
                var options = options || {};
                this.title = options.title || 'Loading Data';
                this.message = options.message || 'Please wait, data is loading.';
            },

            serializeData: function(){
                return {
                    title: this.title,
                    message: this.message
                }
            }
        });
    });

    return App.Common.Views;
});
