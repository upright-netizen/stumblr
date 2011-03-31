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
	ok( $.fn.stumblr, 'Plugin does exists.' );
	ok( $.fn.stumblr.defaults.url, 'Default URL is set' );	
	ok( $.fn.stumblr.defaults.template, 'Default Template is set' );
	ok( $.fn.stumblr.defaults["ajax-data"], 'Default Ajax options are set' );
	ok( $.fn.stumblr.defaults["ajax-data"].dataType, 'Default Ajax data type is set' );
	ok( $.fn.stumblr.defaults.refreshRate, 'Default refresh rate is set' );
	
	equal( 
		$.fn.stumblr.defaults["ajax-data"].dataType, 
		'jsonp', 
		'Ajax data type is JSONP by default' );
});

test('should override default settings by passing an object argument', function(){
	var expected = "http://nowhere.org/no/place";

	$('#test-area').stumblr({
		url: expected,
		'ajax-data': { dataType: 'xml' },
		refreshRate: 1000
	});

	var plugin = $('#test-area').data('stumblr');
	ok( plugin, 'An instance should be attached to the host element.' );
	equal( 
		plugin.options.url, 
		expected, 
		'The URL should be properly overridden by object argument' );
		
	equal(
		recordedAjaxUrl,
		expected + '/api/read/json',
		'The requested URL should be properly formatted.' );
	
	equal(
		plugin.options['ajax-data'].dataType,
		'xml',
		'The Ajax data type should be overridden by object argument' );
		
	equal(
		plugin.options.refreshRate,
		1000,
		'The refresh rate should be overridden by object argument' );	
	
});

test('should override default ajax options based on data attributes of host element.', function() {
	var expected = "http://somewhere.org/some/place";
	$('#test-area').attr('data-url', expected);
	$('#test-area').stumblr();
	equal( 
		recordedAjaxUrl, 
		expected + '/api/read/json', 
		'The URL should be properly overridden by data attributes' );
	
});