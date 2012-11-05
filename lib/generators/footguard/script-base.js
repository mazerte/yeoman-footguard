var util = require('util'),
    path = require('path'),
    grunt = require('grunt'),
    yeoman = require('yeoman');

module.exports = Generator;

function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);
  this.appname = path.basename(process.cwd());

  this.sourceRoot(path.join(__dirname, './templates'));
}

util.inherits(Generator, yeoman.generators.NamedBase);
