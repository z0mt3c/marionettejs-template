define(['application'], function(App){
    App.module('Entities', function(Entities, App, Backbone){
        Entities.Hello = Backbone.Model.extend({
            idAttribute: 'name',
            urlRoot: '/api/hello'
        });

        var API = {
            getHello: function(name) {
                var entity = new Entities.Hello({name: name});
                var defer = $.Deferred();

                entity.fetch({
                    success: function(data){
                        defer.resolve(data);
                    }
                });

                return defer.promise();
            }
        };

        App.reqres.setHandler('test:hello', function(name){
            return API.getHello(name);
        });
    });

    return;
});