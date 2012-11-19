define ['jquery', 'underscore'], ($, _)->

	describe 'Test (Functional) Mocha', ()->
		
		it 'Open mocha panel', (done)->
			$('#mocha #stats').click()
			setTimeout ()->
				expect( $('body').hasClass 'open-mocha' ).to.be.ok()
				done()
			, 500
			
		it 'Close mocha panel', (done)->
			$('#mocha #stats').click()
			setTimeout ()->
				expect( $('body').hasClass 'open-mocha' ).to.not.be.ok()
				done()
			, 500