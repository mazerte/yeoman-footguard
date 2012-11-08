module.exports = function( grunt ) {
  'use strict';

	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-coffeelint');
	
	//
	// Grunt configuration:
	//
	// https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
	//
	grunt.initConfig({

		// Project configuration
		// ---------------------
		
		server: {
			hostname: "localhost",
			port: 1313
		},
		
		// specify an alternate install location for Bower
		bower: {
			dir: 'app/components'
		},
		
		// Coffee to JS compilation
		coffee: {
			main: {
				files: {
					'app/js/*.js': 'src/coffee/*.coffee'
				},
				options: {
					basePath: 'src/coffee'
				}
			},
			app: {
				files: {
					'app/js/*.js': 'src/coffee/app/**/*.coffee'
				},
				options: {
					basePath: 'src/coffee'
				}
			},
			lib: {
				files: {
					'app/js/*.js': 'src/coffee/lib/**/*.coffee'
				},
				options: {
					basePath: 'src/coffee'
				}
			},
			test_main: {
				files: {
					'test/js/*.js': 'src/coffee/*.coffee'
				},
				options: {
					basePath: 'src/coffee'
				}
			},
			test_app: {
				files: {
					'test/js/*.js': 'src/coffee/app/**/*.coffee'
				},
				options: {
					basePath: 'src/coffee'
				}
			},
			test_spec: {
				files: {
					'test/js/*.js': 'src/coffee/spec/**/*.coffee'
				},
				options: {
					basePath: 'src/coffee'
				}
			}	,
			test_lib: {
				files: {
					'test/js/*.js': 'src/coffee/lib/**/*.coffee'
				},
				options: {
					basePath: 'src/coffee'
				}
			}
		},
		
		// compile .scss/.sass to .css using Compass
		compass: {
			dist: {
				// http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
				options: {
					css_dir: 'app/css',
					sass_dir: 'src/sass',
					images_dir: 'app/img',
					javascripts_dir: 'app/js',
					force: true
				}
			}
		},
		
		// compile .less to .css using Recess for bootstrap
		recess: {
			dist: {
				src: [
					'app/components/bootstrap/less/bootstrap.less',
					'app/components/bootstrap/less/responsive.less'
				],
				dest: 'app/css/all-less.css',
				options: {
					compile: true
				}
			}
		},

		// generate application cache manifest
		manifest:{
			dest: ''
		},
		
		// headless testing through PhantomJS
		mocha: {
			all: ['test/**/*.html']
		},
		
		// default watch configuration
		watch: {
			coffee: {
				files: 'src/coffee/**/*.coffee',
				tasks: 'coffee reload'
			},
			compass: {
				files: [
					'src/sass/**/*.{scss,sass}'
				],
				tasks: 'compass reload'
			},
			recess: {
				files: [
					'src/less/**/*.less',
					'app/components/bootstrap/less/**/*.less'
				],
				tasks: 'recess reload'
			},
			components: {
				files: [
					'app/components/*/*.{js,css,less,sass,scss,coffee}'
				],
				tasks: 'copycomponents reload'
			},
			reload: {
				files: [
					'app/*.html',
					'app/css/**/*.css',
					'app/js/*.js',
					'app/js/app/*.js',
					'app/js/vendor/*.js',
					'app/img/**/*'
				],
				tasks: 'reload'
			}
		},
		
		copycomponents: {
			components_dir: '<config:bower.dir>',
			app_dir: 'app/',
			test_dir: 'test/'
		},
		
		// default lint configuration, change this to match your setup:
		// https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
		lint: {
			files: [
				'Gruntfile.js',
				'app/js/app/**/*.js',
				'app/js/lib/**/*.js',
				'test/js/spec/**/*.js'
			]
		},
		
		// specifying JSHint options and globals
		// https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				boss: false,
				shadow: false
			},
			globals: {
				jQuery: true
			}
		},

		// default coffeelint configuration, change this to match your setup:
		// https://github.com/vojtajina/grunt-coffeelint
		coffeelint: {
			app: ['src/coffee/**/*.coffee']
		},
    
		coffeelintOptions: {
			'no_tabs': {
				'level': 'ignore'
			},
			'indentation': {
				'level': 'ignore'
			}	,
			'max_line_length': {
				'level': 'warn'
			}
		},
		
		// Build configuration
		// -------------------
		
		// the staging directory used during the process
		staging: 'temp',
		// final build output
		output: 'deploy',
		
		mkdirs: {
			staging: 'app/'
		},
		
		// Below, all paths are relative to the staging directory, which is a copy
		// of the app/ directory. Any .gitignore, .ignore and .buildignore file
		// that might appear in the app/ tree are used to ignore these values
		// during the copy process.
		
		// renames JS/CSS to prepend a hash of their contents for easier
		// versioning
		rev: {
			txt: 'txt/**/*.txt'
		},
		
		// usemin handler should point to the file containing
		// the usemin blocks to be parsed
		'usemin-handler': {
			html: 'index.html'
		},
		
		// update references in HTML/CSS to revved files
		usemin: {
			html: ['**/*.html'],
			css: ['**/*.css']
		},
		
		// HTML minification
		html: {
			files: ['**/*.html']
		},
		
		// Optimizes JPGs and PNGs (with jpegtran & optipng)
		img: {
			dist: 'img/**'
		},
		
		// rjs configuration. You don't necessarily need to specify the typical
		// `path` configuration, the rjs task will parse these values from your
		// main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
		//
		// name / out / mainConfig file should be used. You can let it blank if
		// you're using usemin-handler to parse rjs config from markup (default
		// setup)
		rjs: {
			// no minification, is done by the min task
			baseUrl: 'js/',
			appDir: '../app/',
			dir: './',
			
			wrap: true,

			removeCombined: true,
			keepBuildDir: true,

			inlineText: false,
			mainConfigFile: 'js/main.js',

			optimize: "uglify",

			modules: [
				{
					name: 'app/vendors',
					exclude: []
				},
				{
					name: 'app/app',
					exclude: ['app/vendors']
				},
				{
					name: 'main',
					exclude: ['config', 'app/app', 'app/vendors']
				}
			]
		}
	});

	// Alias the `test` task to run the `mocha` task instead
	grunt.registerTask('test', 'mocha');
	// Alias the `compass` task to run the `recess` task instead
	grunt.renameTask('clean', 'oldclean');
	grunt.registerTask('clean', 'oldclean recess');
	
	grunt.registerTask('copycomponents', 'Copy components folders in test folder', function() {
		this.requiresConfig('copycomponents.components_dir', 'copycomponents.app_dir', 'copycomponents.test_dir');
		
		var config = grunt.config().copycomponents,
			cb = this.async();
		
		// prior to run the last copy step, switch back the cwd to the original one
		// todo: far from ideal, would most likely go into other problem here
		grunt.file.setBase(config.base);
		
		// todo a way to configure this from Gruntfile
		var ignores = [];
		
		var output = config.components_dir.replace(config.app_dir, config.test_dir);
		
		grunt.task.helper('copy', config.components_dir, output, ignores, function(e) {
	  	var path = require('path');
			if ( e ) {
				grunt.log.error( e.stack || e.message );
			} else {
				grunt.log.ok( path.resolve( config.components_dir ) + ' -> ' + path.resolve( output ) );
			}
			cb(!e);
		});
	});

};
