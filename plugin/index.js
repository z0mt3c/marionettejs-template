var path = require('path');

exports.register = function (plugin, options, next) {
    var tag = options.tag || 'web';
    var api = plugin.select(tag);

    var paths = [];

    var mainPath = path.join(__dirname, options.development ? '../app' : '../dist');
    paths.push(mainPath);

    if (options.development) {
        paths.push(path.join(__dirname, '../.tmp'));
    }

    api.route({
        method: 'GET',
        path: '/{path*}',
        config: {
            tags: [tag],
            handler: {
                directory: {
                    path: paths,
                    index: true
                }
            }
        }
    });

    if (options.handleErrors !== false) {
        api.ext('onPreResponse', function (request, reply) {
            var response = request.response;

            if (!response.isBoom) {
                return reply();
            }


            reply.file(mainPath + '/404.html').code(response.output.statusCode || 404);
        });
    }

    next();
};