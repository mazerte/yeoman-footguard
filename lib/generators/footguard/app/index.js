
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
	
	var welcome =
	'\n   ,gggggggggggggg                                                                                     '.red
	'\n  dP""""""88""""""                   I8                                                             8I '.red
	'\n  Yb,_    88                         I8                                                             8I '.red
	'\n   `""    88                      88888888                                                          8I '.red
	'\n       ggg88gggg                     I8                                                             8I '.red
	'\n          88   8,ggggg,    ,ggggg,   I8        ,gggg,gg  gg      gg    ,gggg,gg   ,gggggg,    ,gggg,8I '.red
	'\n          88   dP"  "Y8gggdP"  "Y8gggI8       dP"  "Y8I  I8      8I   dP"  "Y8I   dP""""8I   dP"  "Y8I '.red
	'\n    gg,   88  i8\'    ,8I i8\'    ,8I ,I8,     i8\'    ,8I  I8,    ,8I  i8\'    ,8I  ,8\'    8I  i8\'    ,8I '.red
	'\n     "Yb,,8P ,d8,   ,d8\',d8,   ,d8\',d88b,   ,d8,   ,d8I ,d8b,  ,d8b,,d8,   ,d8b,,dP     Y8,,d8,   ,d8b,'.red
	'\n       "Y8P\' P"Y8888P"  P"Y8888P"  8P""Y8   P"Y8888P"8888P\'"Y88P"`Y8P"Y8888P"`Y88P      `Y8P"Y8888P"`Y8'.red
	'\n                                                   ,d8I\'                                               '.red
	'\n                                                 ,dP\'8I                                                '.red
	'\n                                                ,8"  8I                                                '.red
	'\n                                                I8   8I                                                '.red
	'\n                                                `8, ,8I                                                '.red
	'\n                                                 `Y8P"                                                 '.red
	'\n                                                                                                       '.red
	
	console.log(welcome);
}

util.inherits(Generator, yeoman.generators.Base);

/*Generator.prototype.askFor = function askFor (argument) {
	var cb = this.async(),
  	self = this;

	// a bit verbose prompt configuration, maybe we can improve that
	// demonstration purpose. Also, probably better to have this in other generator, whose responsability is to ask
	// and fetch all realated bootstrap stuff, that we hook from this generator.
	var prompts = [{
	  name: 'test',
	  message: 'Would you like to include Twitter Bootstrap for Compass instead of CSS?',
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
}*/

Generator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.directory('.','.', true);
};
