define('templates/helpers/eachProperty', ['hbs/handlebars'], function (Handlebars) {
    function eachProperty(context, options) {
        var ret = '';
        var i = 0;
        for (var prop in context) {
            ret = ret + options.fn({property: prop, value: context[prop], first: i === 0, index: i++});
        }
        return ret;
    }

    Handlebars.registerHelper('eachProperty', eachProperty);
    return eachProperty;
});