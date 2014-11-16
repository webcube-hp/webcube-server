module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concurrent: {
			dev: {
				tasks: ['nodemon:dev', 'watch'],
				options: {
					logConcurrentOutput: true
				}
			}
		},
		watch: {
			livereload: {
				files: [
					'public/stylesheets/*.{css,less}',
					'public/javascripts/*.js',
					'views/**/*.jade',
					'.rebooted'
				],
				options: { livereload: true }
			}
		},
		nodemon: {
			dev: {
				script: './bin/www',
				options: {
					env: {
						PORT: 3000,
						NODE_ENV: 'development'
					},
					watch: ['.'],
					callback: function(nodemon) {

						nodemon.on('log', function (event) {
							console.log(event.colour);
						});

						// opens browser on initial server start
						// nodemon.on('config:update', function () {
						// 	// Delay before server listens on port
						// 	setTimeout(function() {
						// 		require('open')('http://localhost:3000');
						// 	}, 1000);
						// });

						// refreshes browser when server reboots
						nodemon.on('restart', function () {
							// Delay before server listens on port
							setTimeout(function() {
								require('fs').writeFileSync('.rebooted', 'rebooted');
							}, 1000);
						});
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('default', ['concurrent:dev']);
}