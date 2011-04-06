;(function($, window, document, undefined){	
	
	$.fn.stumblr = function( options ) {
		var opts = $.extend({}, $.fn.stumblr.defaults, options);
		
		return this.each(function(){
			var elem = $(this),
				o = $.extend({}, opts, elem.data()),
				
				// build our ajax data here from our Tumblr options
				data = (function(){
					var d = {};
					
					if(o.num){
						d['num'] = o.num;
					}
					
					if(o.start){
						d['start'] = o.start;	
					}
					
					if(o['type']){
						d['type'] = o['type'];
					}
					
					if(o['id']){
						d['id'] = o['id'];
					}
					
					return d;
				})(),
				
				stumblr = {
					elem : elem,
					options : o,
					ajax : $.ajax({
						'url' : o.url + '/api/read/json',
						'dataType' : o['data-type'],
						data : data
					})
				};
				
				stumblr.load = $.proxy(function(){
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
		'data-type' : 'jsonp'
	};
	
})(jQuery, window, document);
