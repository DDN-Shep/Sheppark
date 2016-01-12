module.exports = function(grunt) {
	'use strict';

	var env = function env(a, b) {
		for (var i = 0, p; i < this.length && (p = this[i]) && (a = a || {}); i++) a[p] = b.call(p);

		return a;
	}.bind(['development', 'test', 'production']);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	    jade: {
	      compile: {
	        options: {
	          pretty: true,
	          data: {
	            debug: false
	          }
	        },
	        files: {
	          './client/index.html': './server/views/home/index.jade'
	        }
	      }
	    },
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					}),
					require('postcss-color-rgba-fallback')(),
					require('pixrem')()//,
					//require('cssnano')()
				]
			},
			dist: {
				src: './client/styles/*.css'
			}
		},
		sass: {
			dist: {
				files: {
					'./client/styles/main.css' : './server/sass/main.scss'
				}
			}
		},
		concat: {
			js: {
				files: {
					'./client/scripts/bundle.js': [
						'./client/scripts/tag.js',
						'./client/scripts/main.js'
					]
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy HH:MM:ss") %> */\n'
			},
			dist: {
				files: {
					'./client/scripts/bundle.js': './client/scripts/bundle.js'
				}
			}
		},
		riot: {
			options: {
		        concat : true
		    },
		    dist: {
		        src: './server/riot/*.tag',
		        dest: './client/scripts/tag.js'
		    }
	    }
	});
	
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-riot');

	grunt.registerTask('build', 'Build, minify and bundle styles and scripts', function(arg) {
		arg = function arg(arg) {
			return ':' + (arg || 'local');
		}(arg);

		grunt.task.run(['riot', 'sass', 'postcss', 'concat', 'uglify']);
	});
}