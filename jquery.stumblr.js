;(function($, window, document, undefined){	
	
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
					refreshRate : o.refreshRate
				};
				
				stumblr.refresh = $.proxy(function(data){
					var s = this;
					this.ajax.success(function(data){
						s.elem.empty();
						s.options.templateEngine($(s.options.template), data).appendTo(s.elem);
					});
					
					if(this.keepGoing){
						setTimeout(this.refresh, this.options.refreshRate);
					}
				}, stumblr);
			
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
		refreshRate : 30000 // 30 seconds
	};
	
})(jQuery, window, document);
