define [
	'backbone'
	'underscore'<% if( tpl ) { %>
	'text!templates/<% if( folder ) { print(folder +"/"); } %><%= tpl %>.html'<% } %><% if( model ) { %>
	'app/models/<% if( folder ) { print(folder +"/"); } %><%= model %>_model'<% } %>
], (Bacbone, _<% if( tpl ) { print(', tpl'); } %><% if( model ) { print(', ' + grunt.util._.classify(model)); } %>)->

	class <%= grunt.util._.classify(name) %>View extends Backbone.View
		
		events: {}
		<% if( model ) { %>
		model: new <%= grunt.util._.classify(model) %>()<% } %>
		
		initialize: (options)->
			<% if( model ) { %>if options.model?
				@model = model<% } %>
			
		render: ->
			<% if( tpl ) { %>@$el.html _.template( tpl, { <% if( model ) { %>model: @model<% } %> } )<% } %>