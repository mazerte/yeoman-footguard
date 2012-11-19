/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../utils.js'),
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
		name: 'test',
		message: 'Would you like to create associate unit test ?',
		default: 'Y/n',
		warning: 'Yes: All Twitter Bootstrap files will be placed into the styles directory.'
	}];
  
	this.prompt(prompts, function(e, props) {
		if(e) { return self.emit('error', e); }
		
		// manually deal with the response, get back and store the results.
		// We change a bit this way of doing to automatically do this in the self.prompt() method.
		self.test = (/y/i).test(props.test);
		
		// we're done, go through next step
		cb();
	});
}

Generator.prototype.createHelperFiles = function createCollectionFiles() {
	
	this.template('helper.coffee', path.join('src/coffee/app/helpers', this.folder, this.name + '_helper.coffee'));
	
	if( this.test ) {
		this.template('helper_spec.coffee', path.join('src/coffee/spec/unit/helpers', this.folder, this.name + '_helper_spec.coffee'));
		
		var file = 'src/coffee/spec/all_tests.coffee';
	  var body = grunt.file.read(file);

	  body = generatorUtil.rewrite({
	    needle: '# <unit> don\'t remove this comment',
	    haystack: body,
	    splicable: [
	      '	"' + path.join('spec/unit/helpers/', this.folder, this.name + '_helper_spec') + '"'
	    ]
	  });

	  grunt.file.write(file, body);
	}
};
