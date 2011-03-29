// Mock the Ajax requests
var recordedAjaxUrl = "";
var recordedAjaxOptions = {};

jQuery.ajax = function( url, options ) {
	recordedAjaxUrl = url;
	recordedAjaxOptions = options;
	
	return {
		success: function( callback ){ /* blank */ },
		error: function( callback ){ /* blank */ }
	};
};

// Unit Tests
test('should have default config values', function() { 
	ok( $.fn.stumblr, 'Plugin exists.' );
	ok( $.fn.stumblr.defaults.url, 'Default URL is set' );	
	ok( $.fn.stumblr.defaults.template, 'Default Template is set' );
	ok( $.fn.stumblr.defaults["ajax-data"], 'Default Ajax options are set' );
	ok( $.fn.stumblr.defaults["ajax-data"].dataType, 'Default Ajax data type is set' );
	
	equal( $.fn.stumblr.defaults["ajax-data"].dataType, 'jsonp', 'Ajax data type is JSONP by default' );
});

test('should override default settings by passing an object argument', function(){
	var expected = "http://nowhere.org/no/place";
	$('#test-area').stumblr({ url: expected });
	equal( recordedAjaxUrl, expected + '/api/read/json', 'The URL was not properly overridden by object argument' );
	
	$('#test-area').stumblr({ 'ajax-data': 'test' });
	equal( recordedAjaxOptions, 'test', 'The Ajax settings were not properly overridden by object argument' );
});

test('should override default ajax options based on data attributes of host element.', function() {
	var expected = "http://somewhere.org/some/place";
	$('#test-area').attr('data-url', expected);
	$('#test-area').stumblr();
	equal( recordedAjaxUrl, expected + '/api/read/json', 'The URL was not properly overridden by data attributes' );
	
});