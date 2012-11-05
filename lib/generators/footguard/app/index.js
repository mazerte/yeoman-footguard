
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman');

module.exports = Generator;

function Generator() {
  yeoman.generators.Base.apply(this, arguments);
	
	var welcome =
	'\n   ,gggggggggggg,                                   ,ggggggggggg,                                     '.red +
	'\n  dP"""88""""""Y8b,                                dP"""88""""""Y8,                                   '.red +
	'\n  Yb,  88       `8b,                               Yb,  88      `8b                                   '.red +
	'\n   `"  88        `8b                                `"  88      ,8P                                   '.red +
	'\n       88         Y8                                    88aaaad8P"                                    '.red +
	'\n       88         d8  ,gggg,gg    ,gggg,gg    ,ggggg,   88""""Y8ba    ,ggggg,    ,ggg,,ggg,    ,ggg,  '.red +
	'\n       88        ,8P dP"  "Y8I   dP"  "Y8I   dP"  "Y8ggg88      `8b  dP"  "Y8ggg,8" "8P" "8,  i8" "8i '.red +
	'\n       88       ,8P\'i8\'    ,8I  i8\'    ,8I  i8\'    ,8I  88      ,8P i8\'    ,8I  I8   8I   8I  I8, ,8I '.red +
	'\n       88______,dP\',d8,   ,d8b,,d8,   ,d8I ,d8,   ,d8\'  88_____,d8\',d8,   ,d8\' ,dP   8I   Yb, `YbadP\' '.red +
	'\n      888888888P"  P"Y8888P"`Y8P"Y8888P"888P"Y8888P"   88888888P"  P"Y8888P"   8P\'   8I   `Y8888P"Y888'.red +
	'\n                                      ,d8I\'                                                           '.red +
	'\n                                    ,dP\'8I                                                            '.red +
	'\n                                   ,8"  8I                                                            '.red +
	'\n                                   I8   8I                                                            '.red +
	'\n                                   `8, ,8I                                                            '.red +
	'\n                                    `Y8P"                                                             '.red;
	
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
