define [
	'backbone'
], (Backbone)->
	
	class <%= grunt.util._.classify(name) %>Model extends Backbone.Model
		
		defaults:
			key: "value"