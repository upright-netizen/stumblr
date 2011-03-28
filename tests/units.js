test('should have default config values', function() { 
	ok( $.fn.stumblr, 'Plugin exists.' );
	ok( $.fn.stumblr.defaults.url, 'Default URL is set' );	
	ok( $.fn.stumblr.defaults.template, 'Default Template is set' );
	ok( $.fn.stumblr.defaults["ajax-data"], 'Default Ajax options are set' );
	ok( $.fn.stumblr.defaults["ajax-data"].dataType, 'Default Ajax data type is set' );
	
	equal( $.fn.stumblr.defaults["ajax-data"].dataType, 'jsonp', 'Ajax data type is JSONP by default' );
});