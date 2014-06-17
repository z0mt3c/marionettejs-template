var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var processhtml = require('gulp-processhtml');
var nodemon = require('gulp-nodemon')
var path = require('path');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

var paths = {
    app: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist'),
    tmp: path.join(__dirname, '.tmp')
};

gulp.task('clean', function () {
    return gulp.src([paths.dist, paths.tmp], {read: false})
        .pipe(clean());
});

gulp.task('copy', function () {
    var files = [ paths.app + '/*.html', paths.app + '/*.ico', paths.app + '/*.txt', paths.app + '/.htaccess', paths.app + '/styles/fonts/*' ];
    return gulp.src(files, { base: paths.app })
        .pipe(gulp.dest(paths.dist));
});

gulp.task('vendor', function () {
    var files = [ paths.app + '/bower_components/modernizr/modernizr.js' ];
    return gulp.src(files, { base: paths.app })
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('imagemin', function () {
    return gulp.src(paths.app + '/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false}
            ],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('lint-server', function () {
    var jshintFiles = [
        './standalone-server/*.js',
        './plugin/*.js',
    ];

    return gulp.src(jshintFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('lint', function () {
    var jshintFiles = [
            paths.app + '/scripts/**/*.js'
    ];

    return gulp.src(jshintFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('less', function () {
    return gulp.src(paths.app + '/styles/main.less')
        .pipe(less({
            paths: [ path.join(paths.app, 'bower_components') ]
            // sourceMap: true
        }))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest(paths.dist + '/styles'));
});

gulp.task('processhtml', ['copy'], function () {
    return gulp.src(paths.dist + '/index.html')
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('server', function () {
    return nodemon({
        script: 'standalone-server/server.js',
        ext: 'js',
        ignore: ['app/**', 'dist/**', 'node_modules/**', 'gulpfile.js'],
        env: {
            'NODE_ENV': 'production'
        }
    })
        .on('change', ['lint-server'])
        .on('restart', function () {
            console.log('restarted!')
        });
});

gulp.task('browserify', function () {
    var bundleMethod = global.isWatching ? watchify : browserify;
    var bundler = bundleMethod({
        entries: [paths.app + '/scripts/main.js'],
        extensions: ['.coffee', '.hbs']
    });

    var bundle = function () {
        return bundler
            // Enable source maps!
            .bundle({debug: true})
            .pipe(source('main.js'))
            .pipe(gulp.dest(paths.dist + '/scripts'));
    };

    if (global.isWatching) {
        bundler.on('update', bundle);
    }

    return bundle();
});


gulp.task('uglify', ['browserify', 'copy'], function () {
    gulp.src(paths.dist + '/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/scripts'))
});

gulp.task('livereload', function () {
    var server = livereload();

    var changed = function (file) {
        server.changed(file.path);
    };

    gulp.watch(paths.dist + '/**').on('change', changed);
});

gulp.task('setWatch', function () {
    global.isWatching = true;
});

gulp.task('watch', function () {
    global.isWatching = true;
    gulp.watch(paths.app + '/styles/**/*.less', ['less']);
    gulp.watch(paths.app + '/images/**/*', ['imagemin']);
});

gulp.task('build-dev', ['lint', 'lint-server', 'less', 'browserify', 'copy', 'imagemin', 'vendor']);
gulp.task('build', ['build-dev', 'uglify', 'processhtml']);

gulp.task('development', ['setWatch', 'build-dev', 'server', 'watch', 'livereload']);
gulp.task('production-watch', ['setWatch', 'build', 'server', 'watch']);
gulp.task('production', ['build', 'server', 'watch']);

gulp.task('default', ['development']);

