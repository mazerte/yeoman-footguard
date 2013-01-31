var shelljs = require('shelljs')
	, _ = require('underscore')
	, exec = require('child_process').exec;

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
			templates: {
				files: [
					'app/templates/**/*.html'
				],
				tasks: 'copytemplates'
			},
			css: {
				files: [
					'app/css/**/*.css'
				],
				tasks: 'copycss'
			},
			img: {
				files: [
					'app/img/**/*.{png,jpg,jpeg}'
				],
				tasks: 'copyimg'
			},
			html: {
				files: [
					'app/index.html'
				],
				tasks: 'copyhtml'
			},
			reload: {
				files: [
					'app/*.html',
					'app/templates/**.html',
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
		output: 'dist',
		
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
			files: ['index.html']
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
					exclude: [
						'config', 
						'app/app', 
						'app/vendors', 
						'../components/chai/chai',
						'../components/expect/expect',
						'../components/mocha/mocha'
					]
				}
			]
		}
	});

	// Alias the `test` task to run the `mocha` task instead
	grunt.registerTask('test', 'mocha');
	grunt.registerTask('compile', 'clean coffee compass');
	
	// Alias the `compass` task to run the `recess` task instead
	grunt.renameTask('clean', 'oldclean');
	grunt.registerTask('clean', 'oldclean recess copytemplates copyimg copycss copyhtml');
	
	grunt.registerTask('build', 'intro clean coffee compass mkdirs usemin-handler rjs concat removecomponents css min img rev usemin manifest copy time');
	grunt.registerTask('removecomponents', 'remove components folders in temp folder', function() {
		var config = grunt.config()
			, cb = this.async();
		var output = config.bower.dir.replace('app/', '');
		exec('rm -rf ' + output, function(error, stdout, stderr) {
			grunt.log.ok('remove: ' + output);
			cb();
		});
	});
	
	// Helper to syncronize the Bower components directory with app/scripts/vendor
  grunt.registerHelper('bower:sync', function(dir, cb) {
    // Clean the vendor directory then sync with the components directory

    if(typeof cb !== 'function') {
      return grunt.fatal('bower:sync helper requires a callback.');
    }

    if(!dir) {
      return grunt.fatal('bower:sync helper requires a directory path.');
    }
		
    shelljs.rm('-rf', dir);
    shelljs.mkdir('-p', dir);
    shelljs.cp('-R', 'components/*', dir);

		// Remove test, docs, examples of compoments
		var toRemove = _.union(
			grunt.file.expand(dir + '/**/test'),
			grunt.file.expand(dir + '/**/tests'),
			grunt.file.expand(dir + '/**/docs'),
			grunt.file.expand(dir + '/**/examples')
		);
		_(toRemove).each( function(path) {
			grunt.log.ok('remove: ' + path);
    	shelljs.rm('-rf', path);
		});
		
		// Remove symbolic links
		exec("find " + dir + " -lname '*'", function(error, stdout, stderr) {
    	var links = _.compact( stdout.split('\n') );
			_(links).each( function(path) {
				grunt.log.ok('remove: ' + path);
				exec('rm ' + path, function(error, stdout, stderr) {} );
			});

			grunt.task.run('copycomponents');
	  	cb();
		});
  });
	
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
		
    shelljs.rm('-rf', output);
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
	
	grunt.registerTask('copytemplates', 'Copy templates folders in test folder', function() {
		
		var config = grunt.config(),
			cb = this.async();
		
		// prior to run the last copy step, switch back the cwd to the original one
		// todo: far from ideal, would most likely go into other problem here
		grunt.file.setBase(config.base);
		
		// todo a way to configure this from Gruntfile
		var ignores = [];
		
    shelljs.rm('-rf', 'test/templates');
		grunt.task.helper('copy', 'app/templates', 'test/templates', ignores, function(e) {
	  	var path = require('path');
			if ( e ) {
				grunt.log.error( e.stack || e.message );
			} else {
				grunt.log.ok( path.resolve( 'app/templates' ) + ' -> ' + path.resolve( 'test/templates' ) );
			}
			cb(!e);
		});
	});
	
	grunt.registerTask('copycss', 'Copy css folders in test folder', function() {
		
		var config = grunt.config(),
			cb = this.async();
		
		// prior to run the last copy step, switch back the cwd to the original one
		// todo: far from ideal, would most likely go into other problem here
		grunt.file.setBase(config.base);
		
		// todo a way to configure this from Gruntfile
		var ignores = [];
		
    shelljs.rm('-rf', 'test/css');
		grunt.task.helper('copy', 'app/css', 'test/css', ignores, function(e) {
	  	var path = require('path');
			if ( e ) {
				grunt.log.error( e.stack || e.message );
			} else {
				grunt.log.ok( path.resolve( 'app/css' ) + ' -> ' + path.resolve( 'test/css' ) );
			}
			cb(!e);
		});
	});
	
	grunt.registerTask('copyimg', 'Copy images folders in test folder', function() {
		
		var config = grunt.config(),
			cb = this.async();
		
		// prior to run the last copy step, switch back the cwd to the original one
		// todo: far from ideal, would most likely go into other problem here
		grunt.file.setBase(config.base);
		
		// todo a way to configure this from Gruntfile
		var ignores = [];
		
    shelljs.rm('-rf', 'test/img');
		grunt.task.helper('copy', 'app/img', 'test/img', ignores, function(e) {
	  	var path = require('path');
			if ( e ) {
				grunt.log.error( e.stack || e.message );
			} else {
				grunt.log.ok( path.resolve( 'app/img' ) + ' -> ' + path.resolve( 'test/img' ) );
			}
			cb(!e);
		});
	});
	
	grunt.registerTask('copyhtml', 'Copy images folders in test folder', function() {
		
		var config = grunt.config(),
			cb = this.async();
		
		// prior to run the last copy step, switch back the cwd to the original one
		// todo: far from ideal, would most likely go into other problem here
		grunt.file.setBase(config.base);
		
		// todo a way to configure this from Gruntfile
		var ignores = [];
		
    shelljs.rm('-rf', 'test/index.html');
    shelljs.cp('app/index.html', 'test/index.html');
		cb();
	});
	
	// ==========================================================================
  // TASKS OVERLOAD
  // ==========================================================================

  grunt.registerMultiTask('concat', 'Concatenate files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: ';',
      banner: grunt.config('banner') || ''
    });

    // The source files to be concatenated.
    var files = grunt.file.expandFiles(this.file.src);

    // If banner wasn't specified, use empty string. Otherwise process banner
    // and add a linefeed.
    var banner = grunt.template.process(options.banner);

    // Concat banner + specified files.
    var src = banner + grunt.helper('concat', files, {separator: options.separator});

    // Write the destination file.
    grunt.file.write(this.file.dest, src);

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('my File "' + this.file.dest + '" created.');
  });

	grunt.registerHelper('rjs:optimize:js', function(options, cb) {
    if(!cb) { cb = options; options = {}; }
    var mods = options.modules || [{ name: options.name }];

    // automatic configuration via mainConfigFile, assumed to be the app entry
    // point
    if(options.name) {
      options.mainConfigFile = options.mainConfigFile || path.join(options.baseUrl, options.name + '.js');
    }

    grunt.log.subhead('Options:')
      .writeln(grunt.helper('inspect', options));

    var originals = mods.map(function(m) {
      return {
        name: m.name,
        body: grunt.file.read(path.join(options.appDir, options.baseUrl, m.name + '.js'))
      };
    });

    rjs.optimize(options, function(out) {
      grunt.log.writeln(out);
      originals.forEach(function(m) {
        var filepath = path.join(options.dir, options.originalBaseUrl, m.name + '.js');
        grunt.log
          .writeln('rjs optimized module: ' + m.name)
          .writeln('>> ' + filepath);

        grunt.helper('min_max_info', grunt.file.read(filepath), m.body);
      });

      cb();
    });
  });

	grunt.registerMultiTask('usemin-handler', 'Using HTML markup as the primary source of information', function() {
    // collect files
    var files = grunt.file.expandFiles(this.data);

    // concat / min / css / rjs config
    var concat = grunt.config('concat') || {},
      min = grunt.config('min') || {},
      css = grunt.config('css') || {},
      rjs = grunt.config('rjs') || {};

    grunt.log
      .writeln('Going through ' + grunt.log.wordlist(files) + ' to update the config')
      .writeln('looking for build script HTML comment blocks');

    files = files.map(function(filepath) {
      return {
        path: filepath,
        body: grunt.file.read(filepath)
      };
    });

    files.forEach(function(file) {
      var blocks = getBlocks(file.body);
      Object.keys(blocks).forEach(function(dest) {
        var lines = blocks[dest].slice(1, -1),
          parts = dest.split(':'),
          type = parts[0],
          output = parts[1];
        // Handle absolute path (i.e. with respect to th eserver root)
        if (output[0] === '/') {
          output = output.substr(1);
        }

        // parse out the list of assets to handle, and update the grunt config accordingly
        var assets = lines.map(function(tag) {
          var asset = (tag.match(/(href|src)=["']([^'"]+)["']/) || [])[2];

          // RequireJS uses a data-main attribute on the script tag to tell it
          // to load up the main entry point of the amp app
          //
          // First time we findd one, we update the name / mainConfigFile
          // values. If a name of mainConfigFile value are already set, we skip
          // it, so only one match should happen and default config name in
          // original Gruntfile is used if any.
          var main = tag.match(/data-main=['"]([^'"]+)['"]/);
          if(main) {
            if(!rjs.dir) {
              rjs.out = rjs.out || output;
              rjs.name = rjs.name || main[1];
              asset += ',' + output;
            } else {	
              asset += ',' + main[1] + ".js";
            }
          }

          return asset;
        }).reduce(function(a, b) {
          b = ( b ? b.split(',') : '');
          return a.concat(b);
        }, []);

        grunt.log.subhead('Found a block:')
          .writeln(grunt.log.wordlist(lines, { separator: '\n' }))
          .writeln('Updating config with the following assets:')
          .writeln('    - ' + grunt.log.wordlist(assets, { separator: '\n    - ' }));

        // update concat config for this block
				concat[output] = {
				    src: assets,
				    dest: output,
				    separator: (type === 'js') ? ';' : ''
				}
        grunt.config('concat', concat);

        // update rjs config as well, as during path lookup we might have
        // updated it on data-main attribute
        grunt.config('rjs', rjs);

        // min config, only for js type block
        if(type === 'js') {
          min[output] = output;
          grunt.config('min', min);
        }

        // css config, only for css type block
        if(type === 'css') {
          css[output] = output;
          grunt.config('css', css);
        }
      });
    });

    // log a bit what was added to config
    grunt.log.subhead('Configuration is now:')
      .subhead('  css:')
      .writeln('  ' + grunt.helper('inspect', css))
      .subhead('  concat:')
      .writeln('  ' + grunt.helper('inspect', concat))
      .subhead('  min:')
      .writeln('  ' + grunt.helper('inspect', min))
      .subhead('  rjs:')
      .writeln('  ' + grunt.helper('inspect', rjs));

  });

};
