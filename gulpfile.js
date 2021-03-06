'use strict';
var gulp = require('gulp'),
	inject = require('gulp-inject'),
	series = require('stream-series'),

	paths = {
		src: {
			root:				'./public/bower-components/',
			angular:			'./public/bower-components/angular/',
			angularRoute:		'./public/bower-components/angular-route/',
			angularAnimate:		'./public/bower-components/angular-animate/',
			bootstrapCss:		'./public/bower-components/bootstrap/dist/css/',
			bootstrapJs:		'./public/bower-components/bootstrap/dist/js/',
			textAngular:		'./public/bower-components/textAngular/dist/',
			angularBootstrap:	'./public/bower-components/angular-bootstrap/',
			angularTouch:		'./public/bower-components/angular-touch/',
			angularSlider:		'./public/bower-components/angular-awesome-slider/dist/',
			faCss:				'./public/bower-components/font-awesome/css/',
			faFonts:			'./public/bower-components/font-awesome/fonts/',
			jquery:				'./public/bower-components/jquery/dist/'
		},
		public: {
			root:			'./public/',
			js:				'./public/js/',
			css:			'./public/css/',
			fonts:			'./public/fonts/'
		},
		dist:				'./dist/',
	},
	jsSrc = [
		paths.src.angular + 'angular.min.js',
		paths.src.angularRoute + 'angular-route.min.js',
		paths.src.angularAnimate + 'angular-animate.min.js',
		paths.src.textAngular + 'textAngular-rangy.min.js',
		paths.src.textAngular + 'textAngular-sanitize.min.js',
		paths.src.textAngular + 'textAngular.min.js',
		paths.src.angularBootstrap + 'ui-bootstrap-tpls.min.js',
		paths.src.angularTouch + 'angular-touch.min.js',
		paths.src.angularSlider + 'angular-awesome-slider.min.js'
		// paths.src.jquery + 'jquery.min.js',
		// paths.src.bootstrapJs + 'bootstrap.min.js'
	],
	cssSrc = [
		paths.src.bootstrapCss + 'bootstrap.min.css',
		paths.src.bootstrapCss + 'bootstrap-theme.min.css',
		paths.src.faCss + '*.min.css',
		paths.src.textAngular + '*.css',
		paths.src.angularSlider + 'css/angular-awesome-slider.min.css'
	],
	fontsSrc = [
		paths.src.faFonts + '*'
	],
	jsApp = [
		paths.public.js + 'app.js',
		paths.public.js + 'routes.js',
		paths.public.js + 'services/**/*.js',
		paths.public.js + 'controllers/**/*.js',
		paths.public.js + 'directives/**/*.js',
		paths.public.js + 'main.js'
	],
	cssApp = [
		paths.public.css + 'main.css'
	];



gulp.task('inject', function(){

	return gulp.src(paths.public.root + 'index.html')
			.pipe(inject( series(gulp.src(jsSrc), gulp.src(cssSrc)), {ignorePath: 'public', read: false, name: 'vendor'}))
			.pipe(inject( series(gulp.src(jsApp), gulp.src(cssApp)), {ignorePath: 'public', read: false, name: 'build'}))
			.pipe(gulp.dest('./public/'));

});