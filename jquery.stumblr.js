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
					cache : {}
				};
				
				stumblr.refresh = $.proxy(function(data){
					var s = this;
					this.ajax.success(function(data){
						s.elem.empty();
						s.cache = data;
						s.options.templateEngine($(s.options.template), data).appendTo(s.elem);
					});
					
					if(this.options.refresh && this.keepGoing){
						setTimeout(this.refresh, this.options.refreshRate);
					}
				}, stumblr);
			
			elem.data("stumblr", stumblr);
			
			if( o.templateType === undefined || o.templateType === 'tmpl' ){
				elem.data().stumblr.options.templateEngine = $.tmpl;
			}
			
			elem.data().stumblr.refresh();

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
		refresh : false,
		refreshRate : 30000 // 30 seconds
	};
	
})(jQuery, window, document);
