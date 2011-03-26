;(function($){	

	$.fn.stumblr = function( options ) {		
		var elem = $(this);
		var config = { dataType: 'jsonp' };
		var a = $.ajax( options.url + '/api/read/json', config );
		
		a.success( function(data){
			var content = $( options.template ).tmpl( data );
			elem.append( content );
		});
		
		return a;
	};
	
})(jQuery);
