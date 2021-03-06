/*jshint latedef:false */
var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  ScriptBase = require('../script-base.js'),
  generatorUtil = require('../utils.js'),
  yeoman = require('yeoman');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createTestFile = function createTestFile() {
	this.template('test_integration.coffee', path.join('src/coffee/spec/integration', this.folder, this.name + '_spec.coffee'));
	
	var file = 'src/coffee/spec/all_tests.coffee';
	var body = grunt.file.read(file);
	
	body = generatorUtil.rewrite({
	  needle: '# <integration> don\'t remove this comment',
	  haystack: body,
	  splicable: [
	    '	"' + path.join('spec/integration', this.folder, this.name + '_spec') + '"'
	  ]
	});
	
	grunt.file.write(file, body);
};
