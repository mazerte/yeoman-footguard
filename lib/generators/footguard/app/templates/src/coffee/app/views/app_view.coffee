define [
	'backbone'
	'underscore'
	'text!templates/app.html'
	
	'app/views/menu_view'
], (Bacbone, _, tpl, MenuView)->

	class App extends Backbone.View
		
		el: "body"
		
		events: {}
		
		initialize: (options)->
			
			
		render: ->
			@$el.html _.template( tpl, {  } )
			
	appView = new App()