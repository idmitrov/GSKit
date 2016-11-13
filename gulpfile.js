(function(config) {
	'use strict';

	// DEPENDENCIES
	let gulp = require('gulp'),
		historyApiFallback = require('connect-history-api-fallback'),
		browserSync = require('browser-sync').create(),
		plugins = require('gulp-load-plugins')({
			pattern: ['gulp-*', 'gulp.*'],
  			replaceString: /\bgulp[\-.]/
		});

	// MINIFY CSS
	gulp.task('minify-css', () => {
		gulp.src(config.path.prod.style + '**/*.css')
			.pipe(plugins.uglify()
			.pipe(gulp.dest(config.path.prod.style))
		);
	});

	// MINIFY JS
	gulp.task('minify-js', () => {
		gulp.src(config.path.prod.script + '**/*.js')
			.pipe(plugins.uglify())
			.pipe(gulp.dest(config.path.prod.script))
	});

	// CLEAN
	gulp.task('clean', () => {
		gulp
			.src(config.path.dev.style, { read: false })
			.pipe(plugins.clean());
	});

	// SCRIPTS
	gulp.task('scripts', () => {
		return (
			gulp
				.src([
					config.path.dev.script + '**/*.js',
					config.path.dev.script + '**/*_.js'
				])
				.pipe(plugins.sourcemaps.init())
				.pipe(plugins.concat('main.js'))
				.pipe(plugins.sourcemaps.write(config.path.root))
				.pipe(gulp.dest(config.path.prod.script))
				.pipe(browserSync.stream())
		);
	});

	// STYLES
	gulp.task('styles', () => {
		gulp.src(config.path.dev.style + 'style.scss')
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass().on('error', plugins.sass.logError))
			.pipe(plugins.sourcemaps.write(config.path.root))
			.pipe(gulp.dest(config.path.prod.style))
			.pipe(browserSync.stream())
	});

	// WATCH
	gulp.task('watch', () => {
		browserSync.init({
	        server: {
	            baseDir: config.path.prod.index,
	            middleware: [ historyApiFallback() ]
	        }
	    });

		// HTML
		gulp.watch(
			config.path.prod.index + '**/*.html'
		).on('change', browserSync.reload);

		// CSS
		gulp.watch(
			config.path.dev.style + '**/*.scss', ['styles']
		);
		
		// JS
		gulp.watch(
			config.path.dev.script + '**/*.js', ['scripts']
		);
	});

	// DEFAULT
	gulp.task('default', ['styles', 'scripts', 'watch']);
} (require('./config.js')));