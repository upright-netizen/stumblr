/* Mock the jQuery Ajax behavior */
QUnit.begin = function(){
	jQuery.ajax = function( url, options, undefined ){
		return {
			success: function(){ /* ... */ },
			error: function(){ /* ... */ }
		};
	};
};

test('Should have default config values', function() { 
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

/* Test overriding the defaults by passing in an object argument */
test('Should override the defaults using an object argument', function(){
	var expectedUrl = 'http://test.org/no/place';
	var expectedTemplate = '#other-tmpl';
	var expectedDataType = 'xml';
	var expectedRefreshRate = 1500;
	
	var o = $('#test-object-argument')
		.stumblr({ 
			url: expectedUrl,
			template: expectedTemplate,
			"ajax-data": { dataType: expectedDataType },
			refreshRate: expectedRefreshRate })
		.data('stumblr');
	
	equal( o.options.url, expectedUrl );
	equal( o.options.template, expectedTemplate );
	equal( o.options['ajax-data'].dataType, expectedDataType );
	equal( o.options.refreshRate, expectedRefreshRate );
});

/* Test overriding the defaults by setting data attributes */
test('Should override the defaults using data attributes', function(){
	var elem = $('#test-data-attributes');
	var expectedUrl = elem.data('url');
	var expectedTemplate = elem.data('template');
	var expectedDataType = elem.data('ajax-data').dataType;
	var expectedRefreshRate = elem.data('refreshRate');
	
	$('#test-area').attr('data-url', expectedUrl);
	var o = $('#test-data-attributes')
		.stumblr()
		.data('stumblr');
	
	equal( o.options.url, expectedUrl );
	equal( o.options.template, expectedTemplate );
	equal( o.options['ajax-data'].dataType, expectedDataType );
	equal( o.options.refreshRate, expectedRefreshRate );
});