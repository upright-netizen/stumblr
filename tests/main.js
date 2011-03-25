describe( "stumblr", function(){
	it( "should publish the /stumblr/request event", function(){
		var has_executed = false;
		$.subscribe( '/stumblr/request', function(){ has_executed = true; });
		
		$( "#test" ).stumblr( "test.org" );
		$.unsubscribe( '/stumblr/request' );
		
		expect( has_executed ).toEqual( true );
	});

});