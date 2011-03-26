;(function($, window, document, undefined){	
	/*
	*	Nathan Stilwell rules!!!
	*/
	$.fn.stumblr = function( options ) {
		var opts = $.extend({}, $.fn.stumblr.defaults, options);
		
		return this.each(function(){
			var elem = $(this),
				o = $.extend({}, opts, elem.data()),
				a = $.ajax( o.url + '/api/read/json', o['ajax-data'] );
				
			
			a.success( function(data){
				var content = $( o.template ).tmpl( data );
				elem.append( content );
			});
		});
	};
	
	//
	//plugin defaults
	//
	$.fn.stumblr.defaults = {
		url : "http://nathanstilwell.tumblr.com",
		template : "#stumblr-posts-tmpl",
		"ajax-data" : { dataType : 'jsonp' }
	};
	
})(jQuery, window, document);
