(function(undefined) {
	module.exports = function(grunt) {

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			concat: {
				app: {
					dest: 'build/js/app.min.js',
					src: [
						'bower_components/jquery/dist/jquery.js',
						'bower_components/bootstrap/dist/js/bootstrap.js',
						'bower_components/angular/angular.js',
						'bower_components/angular-route/angular-route.js',
						'bower_components/angular-geohash/dist/angular-geohash.min.js',
						'bower_components/angular-clipboard/angular-clipboard.js',
						'bower_components/angular-toastr/dist/angular-toastr.min.js',
						'bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',

						'app/app.js',
						'app/config.js',
						'app/constants.js',
						'app/routes.js',
						'app/components/home/HomeController.js',
						'app/services/MapService.js',
						'app/services/GeocoderService.js'
					]
				}
			},

			copy: {
				assets: {
					files: [{
						src: ['img/*'], dest: 'build/'
					}, {
						expand: true, flatten: true,
						src: ['js/**.*'], dest: 'build/js'
					}, {
						expand: true, flatten: true,
						src: ['bower_components/font-awesome/fonts/**.*'], dest: 'build/fonts'
					}]
				},
				deploy: {
					files: [{
						src: ['build/**/*'], dest: 'deploy/'
					}, {
						src: ['index.html'], dest: 'deploy/index.html'
					}, {
						src: ['app/components/home/home.html'], dest: 'deploy/components/home/home.html'
					}]
				}
			},

			uglify: {
				app: {
					options: { mangle: false },
					files: { 'build/js/app.min.js': ['build/js/app.min.js'] }
				}
			},

			cssmin: {
				combine: {
					files: {
						'build/css/app.min.css': [
							'css/bootstrap-paper.min.css',
							'bower_components/font-awesome/css/font-awesome.css',
							'bower_components/angular-toastr/dist/angular-toastr.min.css',
							'css/app.css',
						]
					}
				}
			},

			watch: {
				js: {
					files: ['Gruntfile.js', 'app/**/*.js'],
					tasks: ['concat:app', 'jshint'],
					options: { atBegin: true, liveReload: true }
				},
				css: {
					files: ['Grutfile.js', 'css/**/*.css'],
					tasks: ['cssmin'],
					options: { atBegin: true, liveReload: true }
				}
			},

			jshint: {
				all: ['Gruntfile.js', 'app/**/*.js']
			},

			'gh-pages': {
		    options: {
		      base: 'deploy'
		    },
		    src: ['**']
		  },

		  notify_hooks: {
		    options: { enabled: true, success: true, max_jshint_notifications: 5 }
		  }
		});

		grunt.loadNpmTasks('grunt-notify');
		grunt.task.run('notify_hooks');

		grunt.registerTask('default', ['concat',  'cssmin', 'copy:assets']);
		grunt.registerTask('deploy', ['default',  'uglify', 'copy:deploy']);

		require('time-grunt')(grunt);
		require('jit-grunt')(grunt);
	};

})();
