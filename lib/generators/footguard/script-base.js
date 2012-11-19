var util = require('util'),
    path = require('path'),
    grunt = require('grunt'),
    yeoman = require('yeoman');

module.exports = Generator;

grunt.registerHelper('inspect', function(o) {
  return util.inspect(o, false, 4, true);
});

function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.appname = path.basename(process.cwd());

  this.argument('folder', { type: String, required: false });

  this.sourceRoot(path.join(__dirname, './templates'));
}

util.inherits(Generator, yeoman.generators.NamedBase);
