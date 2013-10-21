define(["application", "default/DefaultView"], function (App, View) {
    return {
        showStart: function () {
            var view = new View.Start({});
            view.on('showModal', function() {
                console.log('showModal');
                alert('showModal');
            });
            App.mainRegion.show(view);
        },

        showHello: function (name) {
            require(['entities/default'], function() {
                var fetchEntity = App.request("test:hello", name);
                $.when(fetchEntity).done(function(entity){
                    var view = new View.Hello({
                        model: entity
                    });
                    App.mainRegion.show(view);
                });
            });
        }
    }
});

