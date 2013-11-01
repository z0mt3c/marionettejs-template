define(['application', 'apps/header/HeaderView', 'underscore'], function (App, View, _) {
    return {
        listHeader: function () {
            require(['entities/header'], function () {
                var links = App.request('header:entities');
                var headers = new View.Headers({collection: links});

                headers.on('brand:clicked', function () {
                    App.trigger('default:start');
                });

                headers.on('itemview:navigate', function (childView, model) {
                    var trigger = model.get('navigationTrigger');

                    if (!_.isArray(trigger)) {
                        trigger = [trigger];
                    }

                    App.trigger.apply(App, trigger);
                });

                App.headerRegion.show(headers);
            });
        },

        setActiveHeader: function (headerUrl) {
            var links = App.request('header:entities');
            var headerToSelect = links.find(function (header) {
                return header.get('url') === headerUrl;
            });
            headerToSelect.select();
            links.trigger('reset');
        }
    };
});
