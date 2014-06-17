var gulp = require('gulp');
var browserify = require('gulp-browserify');
var less = require('gulp-less');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var processhtml = require('gulp-processhtml');
var nodemon = require('gulp-nodemon')
var path = require('path');

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
    var files = [ paths.app + '/*.html', paths.app + '/*.ico', paths.app + '/*.txt', paths.app + '/.htaccess', paths.app + '/styles/fonts/*', paths.app + '/bower_components/modernizr/modernizr.js' ];
    return gulp.src(files, { base: paths.app })
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
        ignore: ['app/**', 'node_modules/**', 'gulpfile.js'],
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
    return gulp.src(paths.app + '/scripts/main.js')
        .pipe(browserify({
            transform: ['hbsfy']
        }))
        .pipe(rename('main.js'))
        .pipe(gulp.dest(paths.dist + '/scripts'))
});


var source = require('vinyl-source-stream')
var watchify = require('watchify')

gulp.task('watch', function () {
    gulp.watch(paths.app + '/styles/**/*.less', ['less']);
    gulp.watch(paths.app + '/images/**/*', ['imagemin']);

    var bundler = watchify(paths.app + '/scripts/main.js');
    var rebundle = function() {
        return bundler.bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest(paths.dist + '/scripts'))
    };

    bundler.transform('hbsfy');
    bundler.on('update', rebundle)
    return rebundle()
});


gulp.task('default', ['lint', 'lint-server', 'watch', 'less', 'copy', 'imagemin', 'browserify', 'processhtml', 'server']);