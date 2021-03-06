var gulp = require('gulp');
var path = require('path');

// Java-Script
var browserify = require('browserify');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// Html, Images and Styles
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var processhtml = require('gulp-processhtml');

// Utils
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Configuration
var paths = {
	app: path.join(__dirname, 'app'),
	dist: path.join(__dirname, 'dist'),
	tmp: path.join(__dirname, '.tmp')
};

// Helper
var startTime;
var helper = {
	startBundleLogging: function(filepath) {
		startTime = process.hrtime();
		gutil.log('Bundling', gutil.colors.green(filepath) + '...');
	},
	endBundleLogging: function(filepath) {
		var taskTime = process.hrtime(startTime);
		var prettyTime = prettyHrtime(taskTime);
		gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
	},
	handleErrors: function(title) {
		return function() {
			var args = Array.prototype.slice.call(arguments);

			// Send error to notification center with gulp-notify
			notify.onError({
				title: title,
				message: '<%= error.message %>'
			}).apply(this, args);

			// Keep gulp from hanging on this task
			this.emit('end');
		}
	},
	lintFiles: function(title, jshintFiles) {
		return gulp.src(jshintFiles)
			.pipe(jshint())
			.pipe(jshint.reporter(stylish || 'default'))
			.pipe(jshint.reporter('fail'))
			.on('error', helper.handleErrors('Lint failed (' + title + ')'));
	}
};

var DEBUG = (process.env.DEBUG === 'true');

gulp.task('clean', function() {
	return gulp.src([paths.dist, paths.tmp], {read: false})
		.pipe(rimraf());
});

gulp.task('copy-fonts', function() {
	return gulp.src([
		'./node_modules/font-awesome/fonts/*'
	], {base: './node_modules/font-awesome'})
		.pipe(gulp.dest(paths.dist + '/styles'));
});

gulp.task('copy', ['copy-fonts'], function() {
	var files = [
		paths.app + '/*.html',
		paths.app + '/*.ico',
		paths.app + '/*.txt',
		paths.app + '/.htaccess',
		paths.app + '/styles/fonts/*'
	];

	return gulp.src(files, {base: paths.app})
		.pipe(gulp.dest(paths.dist));
});

gulp.task('imagemin', function() {
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

gulp.task('lint', function() {
	return helper.lintFiles('client', [
		paths.app + '/scripts/**/*.js'
	]);
});

gulp.task('lint-server', function() {
	return helper.lintFiles('server', [
		'./standalone-server/*.js',
		'./plugin/**/*.js'
	]);
});

gulp.task('less', function() {
	var pipe = gulp.src(paths.app + '/styles/main.less')
		.pipe(less({
			paths: [path.join(paths.app, 'bower_components')],
			sourceMap: DEBUG
		})).on('error', helper.handleErrors('LESS failed'));

	if (!DEBUG) {
		pipe = pipe.pipe(minifyCSS({keepBreaks: true}));
	}

	return pipe
		.pipe(gulp.dest(paths.dist + '/styles'))
		.pipe(reload({stream: true}));
});

gulp.task('processhtml', ['copy'], function() {
	return gulp.src(paths.dist + '/index.html')
		.pipe(processhtml('index.html'))
		.pipe(gulp.dest(paths.dist));
});

gulp.task('server', function() {
	return nodemon({
		script: 'standalone-server/server.js',
		ext: 'js',
		ignore: ['app/**', 'dist/**', 'node_modules/**', 'gulpfile.js'],
		env: {
			'NODE_ENV': 'production'
		}
	})
		.on('change', ['lint-server'])
		.on('restart', function() {
			console.log('restarted!');
		});
});

gulp.task('browserify', function() {
	var bundler = browserify({
		// Required watchify args
		cache: {}, packageCache: {}, fullPaths: true,
		// Specify the entry point of your app
		entries: [paths.app + '/scripts/main.js'],
		// Add file extentions to make optional in your requires
		extensions: ['.hbs'],
		// Enable source maps!
		debug: DEBUG
	});

	var reportFinished = function() {
		helper.endBundleLogging('main.js')
	};

	var bundle = function() {
		helper.startBundleLogging('main.js');

		return bundler
			.bundle()
			// Report compile errors
			.on('error', helper.handleErrors('Browserify failed'))
			// Use vinyl-source-stream to make the
			// stream gulp compatible. Specifiy the
			// desired output filename here.
			.pipe(source('main.js'))
			// Specify the output destination
			.pipe(gulp.dest(paths.dist + '/scripts'))
			.on('end', reportFinished);
	};

	if (global.isWatching) {
		// Wrap with watchify and rebundle on changes
		bundler = watchify(bundler);
		// Rebundle on update
		bundler.on('update', bundle);
	}

	return bundle();
});


gulp.task('uglify', ['browserify', 'copy'], function() {
	if (!DEBUG) {
		gulp.src(paths.dist + '/scripts/*.js')
			.pipe(uglify())
			.pipe(gulp.dest(paths.dist + '/scripts'));
	}
});

gulp.task('livereload', ['doWatch'], function() {
	browserSync({
		proxy: 'localhost:8000'
	});

	gulp.watch(paths.dist + '/**/*.js', browserSync.reload);
});

gulp.task('setWatch', function() {
	global.isWatching = true;
});

gulp.task('doWatch', ['copy'], function() {
	global.isWatching = true;
	gulp.watch(paths.app + '/styles/**/*.less', ['less']);
	gulp.watch(paths.app + '/images/**/*', ['imagemin']);
	gulp.watch(paths.app + '/scripts/**/*.js', ['lint']);
	gulp.watch('./standalone-server/*.js', ['lint-server']);
	gulp.watch('./plugin/**/*.js', ['lint-server']);
});

gulp.task('build-dev', ['lint', 'lint-server', 'less', 'browserify', 'copy', 'imagemin']);
gulp.task('build', ['build-dev', 'uglify', 'processhtml']);

gulp.task('watch', ['setWatch', 'build-dev', 'server', 'doWatch', 'livereload']);

gulp.task('production', ['build', 'server', 'watch']);
gulp.task('production-watch', ['setWatch', 'build', 'server', 'doWatch']);

gulp.task('default', ['watch']);

