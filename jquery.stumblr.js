;(function($){
	var $host = null;
	
	$.fn.stumblr = function( url ) {
		$host = $(this);
		$.publish( "/stumblr/request", [ url ] );
	};
	
	// Request the feed from the Tumblr API
	$.subscribe( "/stumblr/request", function( url ){
		// Make the AJAX request here using the url param.
		// Publish the render event with the returned data.
	});
	
	// Render the specified template for the content
	$.subscribe( "/stumblr/render", function( data ){
		// Render the template into the host element using
		// 		the data param.
	});
})(jQuery);