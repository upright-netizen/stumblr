;(function($){
	var $host = null;
	
	$.fn.stumblr = function( url ) {
		$.publish( "/stumblr/request", [ url ] );
	};
	
})(jQuery);