(function($){
	$.fn.slideshow = function(options){
		var $el = $(this),
				defaults = {
					interval: 4000,
					container: $el,
					slides: 'li'
				};
		
		var Slideshow = function(options){
			this.options = options;
			this.initialize();
		};
		
		$.extend(Slideshow.prototype, {
			initialize: function(){
				this.slides = new Slides($el.find(this.options.slides));
				this.setup_panel();
				this.start();
			},
			
			setup_panel: function(){
				this.$panel = this.options.container;
				this.$panel.css({width:this.slides.length() * 100 + '%'});
			},
			
			update_position: function(index){
				this.$panel.css({left: -index * 100 + '%'});
			},
			
			start: function(){
				var that = this;
				
				setInterval(function(){
					var new_index = that.slides.next();
					
					that.update_position(new_index);
				}, this.options.interval);
			}
		});
		
		
	
		var Slides = function(slides){
			this._current_index = 0;
			this._$slides = slides;
			this.initialize();
		};
		
		$.extend(Slides.prototype, {
			initialize: function(){
				this.set_indicies();
				this.set_width();
			},
		
			length: function(){
				return this._$slides.length;
			},
		
			get_current_index: function(){
				return this._current_index;
			},
			
			set_current_index: function(index){
				this._current_index = index;
			},
			
			set_indicies: function(){
				this._$slides.each(function(i, slide){
					$(slide).attr({'data-index':i});
				});
			},
			
			set_width: function(){
				this._$slides.css({width: 100 / this.length() + '%' });
			},
			
			find_slide_by_index: function(index){
				return this._$slides.filter('[data-index='+index+']');
			},
			
			slide_exists: function(index){
				return this.find_slide_by_index(index).length ? true : false;
			},
			
			next: function(){
				var next = this.slide_exists(this.get_current_index() + 1) ? this.get_current_index() + 1 : 0;
	
				this.set_current_index(next); 
				return next;
			},
			
			previous: function(){
				var previous = this.slide_exists(this.get_current_index() - 1) ? this.get_current_index() - 1 : 0;
	
				this.set_current_index(previous); 
				return previous;
			}
		});
			
		options = $.extend({}, defaults, options);
		new Slideshow(options);
	}
}(jQuery));