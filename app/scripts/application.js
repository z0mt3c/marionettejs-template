define([
	'backbone',
	'communicator',
    'clientconfig',
	'hbs!template/main'
],
function( Backbone, Communicator, config, main_tmpl) {
    'use strict';
    console.log('Config loaded:');
    console.log(config);

	var MainTmpl = main_tmpl;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
        navigationRegion: '#navigation-region',
        mainRegion: '#main-region'
        // dialogRegion: '#dialog-region'
    });

    App.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function(){
        return Backbone.history.fragment
    };

    App.startSubApp = function(appName, args){
        var currentApp = appName ? App.module(appName) : null;
        if (App.currentApp === currentApp){ return; }

        if (App.currentApp){
            App.currentApp.stop();
        }

        App.currentApp = currentApp;
        if(currentApp){
            currentApp.start(args);
        }
    };

	/* Add initializers here */
	App.addInitializer( function () {
		document.body.innerHTML = MainTmpl({});
		Communicator.mediator.trigger("app:start");
	});

    var initializeRouter = function () {
        Backbone.history.start({ pushState: true });
        $(document).on('click', 'a:not([data-bypass])', function (e) {
            var href = $(this).attr('href');
            var protocol = this.protocol + '//';

            if (href.slice(protocol.length) !== protocol) {
                e.preventDefault();
                App.navigate(href, true);
            }
        });
    }

    App.on("initialize:after", function(){
        if (Backbone.history){
            require(['default/DefaultApp'], function () {
                initializeRouter();

                if (App.getCurrentRoute() === ""){
                    App.trigger("default:start");
                }
            });
        }

        $('.nav a').on('click', function(){
            if ($('.navbar-collapse').hasClass('in')) {
                $(".navbar-toggle").click();
            }
        });
    });

	return App;
});