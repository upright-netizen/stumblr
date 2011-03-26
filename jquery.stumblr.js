;(function($, window, document, undefined){	
	/*
	*	Nathan Stilwell rules!!!
	*/
	$.fn.stumblr = function( options ) {
		var opts = $.extend({}, $.fn.stumblr.defaults, options);
		
		return this.each(function(){
			var elem = $(this),
				config = { dataType: 'jsonp' }, //this sucks, make it better
				a = $.ajax( options.url, config );
				
			a.success( function(data){
				var content = $( options.template ).tmpl( data );
				elem.append( content );
			});
		});
	};
	
})(jQuery, window, document);
