;(function($, window, document, undefined){	
	/*
	*	Nathan Stilwell rules!!!
	*/
	$.fn.stumblr = function( options ) {
		var opts = $.extend({}, $.fn.stumblr.defaults, options);
		
		return this.each(function(){
			var elem = $(this),
				o = $.extend({}, opts, elem.data()), 
				a = $.ajax( o.url + '/api/read/json', {
					'dataType' : o['data-type'],
					data : {
						'num' : o.number || '',
						'start' : o.start || '',
						'type' : o['post-type'] || undefined,
						'id' : o['just-one'] || undefined
					}
				}),
				
				stumblr = {
					elem : elem,
					options : o,
					ajax : a
				};
				
				stumblr.load = $.proxy(function(data){
					var s = this;
					this.ajax.success(function(data){
						s.options.templateEngine($(s.options.template), data).appendTo(s.elem);
					});
				}, stumblr);
				
			elem.data("stumblr", stumblr);
			
			if( o.templateType === undefined || o.templateType === 'tmpl' ){
				elem.data().stumblr.options.templateEngine = $.tmpl;
			}
			
			elem.data().stumblr.load();

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
		'data-type' : 'jsonp',
		'number' : undefined,
		'start' : undefined,
		'post-type' : undefined,
		'just-one' : '3720076960'
	};
	
})(jQuery, window, document);
