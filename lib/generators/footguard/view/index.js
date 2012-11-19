/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../utils.js'),
	ModelGenerator = require('../model/index.js'),
  yeoman = require('yeoman');

grunt.util._.mixin( require('underscore.inflections') );

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor (argument) {
	var cb = this.async(),
		self = this;

	// a bit verbose prompt configuration, maybe we can improve that
	// demonstration purpose. Also, probably better to have this in other generator, whose responsability is to ask
	// and fetch all realated bootstrap stuff, that we hook from this generator.
	var prompts = [{
		name: 'model',
		message: 'Would you like to create associate model (' + this.name + ')?',
		default: 'y/model/N',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}, {	
		name: 'tpl',
		message: 'Would you like to create associate template (' + this.name + ')?',
		default: 'Y/template/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}, {
		name: 'sass',
		message: 'Would you like to create associate sass file (' + this.name + ')?',
		default: 'Y/sass/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}, {
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}];
  
	this.prompt(prompts, function(e, props) {
		if(e) { return self.emit('error', e); }
		
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.model = false;
		if( props.model != "y/model/N" ) {
			if( props.model == "y" ) {
				self.model = self.name;
			} else if( !(/n/i).test(props.model) ) {
				self.model = props.model;
			}
		}
		
		self.tpl = self.name;
		if( props.tpl != "Y/template/n" ) {
			if( props.tpl == "n" ) {
				self.tpl = false;
			} else {
				self.tpl = props.tpl;
			}
		}
		
		self.sass = self.name;
		if( props.sass != "Y/sass/n" ) {
			if( props.sass == "n" ) {
				self.sass = false;
			} else {
				self.sass = props.sass;
			}
		}
		
		self.test = (/y/i).test(props.test);
		
		// we're done, go through next step
		cb();
	});
}

Generator.prototype.createViewFiles = function createCollectionFiles() {
	//console.log('Model: ' + this.model);
	//console.log('Use unit test: ' + this.test);
	this.template('view.coffee', path.join('src/coffee/app/views', this.folder, this.name + '_view.coffee'));
	
	if( this.model ) {
		mg = new ModelGenerator();
		mg.name = this.model;
		mg.folder = this.folder;
		mg.test = this.test;
		mg.createModelFiles();
	}
	
	if( this.sass ) {
		this.template('view.sass', path.join('src/sass', this.folder, '_' + this.name + '.sass'));
	}
	
	if( this.tpl ) {
		this.template('view.html', path.join('app/templates', this.folder, this.name + '.html'));
		
		var file = 'src/sass/main.sass';
	  var body = grunt.file.read(file);

	  body = generatorUtil.rewrite({
	    needle: '// <here> don\'t remove this comment',
	    haystack: body,
	    splicable: [
	      '@import ' + path.join(this.folder, this.name)
	    ]
	  });

	  grunt.file.write(file, body);
	}
	
	if( this.test ) {
		this.template('view_spec.coffee', path.join('src/coffee/spec/unit/views', this.folder, this.name + '_view_spec.coffee'));
		
		if( this.tpl ) {
			this.template('view.html', path.join('test/templates', this.folder, this.name + '.html'));
		}
		
		var file = 'src/coffee/spec/all_tests.coffee';
	  var body = grunt.file.read(file);

	  body = generatorUtil.rewrite({
	    needle: '# <unit> don\'t remove this comment',
	    haystack: body,
	    splicable: [
	      '	"' + path.join('spec/unit/views/', this.folder, this.name + '_view_spec') + '"'
	    ]
	  });

	  grunt.file.write(file, body);
	}
};
