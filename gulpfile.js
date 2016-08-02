/**
*	Required config with required props:
*
*	path: root: '$value',
*	path: dev: { index: '$value', script: '$value', style: '$value' }
*	path: prod: { index: '$value', script: '$value', style: '$value' }
*/
(function(config) {
	'use strict';

	// DEPENDENCIES
	var historyApiFallback = require('connect-history-api-fallback'),
		gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		plugins = require('gulp-load-plugins')({
			pattern: ['gulp-*', 'gulp.*'],
  			replaceString: /\bgulp[\-.]/
		});

	// CLEAN
	gulp.task('clean', function() {
		gulp
			.src(config.path.dev.style, { read: false })
			.pipe(plugins.clean());
	});

	// SCRIPTS
	gulp.task('scripts', function() {
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
	gulp.task('styles', function() {
		gulp.src(config.path.dev.style + 'style.scss')
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass().on('error', plugins.sass.logError))
			.pipe(plugins.sourcemaps.write(config.path.root))
			.pipe(gulp.dest(config.path.prod.style))
			.pipe(browserSync.stream())
	});

	// WATCH
	gulp.task('watch', function() {
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
} (require('./config.js')))