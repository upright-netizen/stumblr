;(function($, window, document, undefined){	
	/*
	*	Nathan Stilwell rules!!!
	*/
	$.fn.stumblr = function( options ) {
		var opts = $.extend({}, $.fn.stumblr.defaults, options);
		
		return this.each(function(){
			var elem = $(this),
				o = $.extend({}, opts, elem.data()), 
				a = $.ajax( o.url + '/api/read/json', o['ajax-data'] ),
				stumblr = {
					elem : elem,
					options : o,
					ajax : a,
					keepGoing : true,
					refreshRate : o.refreshRate,
					refresh : function(data){
						
						this.ajax.success(function(data){
							//this.o.templateEngine($(this.o.template), data).appendTo(this.elem);
							console.log('ping');
						});
						
						if(this.keepGoing){
							setTimeout(this.refresh, this.options.refreshRate);
						}
					}
				};
			
			elem.data("stumblr", stumblr);
			
			if( o.templateType === undefined || o.templateType === 'tmpl' ){
				elem.data().stumblr.options.templateEngine = $.tmpl;
			}
			
			elem.data().stumblr.refresh();
			//a.success( function(data){
			//	//var content = $( o.template ).tmpl( data );
			//	//elem.append( content );
			//	o.templateEngine($(o.template), data).appendTo(elem);
			//});
		});
	};
	//
	//	Private functions
	//
	function debug(output, method){
		if(window.console && window.console.debug){
			(method) ?
				console[method]( output )
			:
				console.log( output )
		}
	}
	
	//
	//plugin defaults
	//
	$.fn.stumblr.defaults = {
		url : "http://nathanstilwell.tumblr.com",
		template : "#stumblr-posts-tmpl",
		"ajax-data" : { dataType : 'jsonp' },
		refreshRate : 500
	};
	
})(jQuery, window, document);
