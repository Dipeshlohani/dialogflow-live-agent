

(function($) {
	$(document).ready(function(){
		// Header sticky
		// Header sticky
		// $(function() {
		// 	var header = $(".avn_header_area");

		// 	$(window).scroll(function() {    
		// 		var scroll = $(window).scrollTop();
		// 		if (scroll >= 1) {
		// 			header.addClass("header_sticky");
		// 		} else {
		// 			header.removeClass("header_sticky");
		// 		}
		// 	});

		// });

		// add remove class js
		// add remove class js
		$('.avn_single_chat_items').click(function(){
			$('.avn_single_chat_items').removeClass('chat_active');
			$(this).addClass('chat_active');
		});

		// add remove class js
		// add remove class js
		$('.avn_sitebar > ul > li').click(function(){
			$('.avn_sitebar > ul > li').removeClass('menu_active');
			$(this).addClass('menu_active');
		});

		// Accordion menu
		// Accordion menu
		$(document).ready(function(){
			var Accordion = function(el, multiple) {
				this.el = el || {};
				this.multiple = multiple || false;

				var links = this.el.find('.single_menu_items');
				links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
		}

		Accordion.prototype.dropdown = function(e) {
			var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

			$next.slideToggle();
			$this.parent().toggleClass('open');

			if (!e.data.multiple) {
				$el.find('.sub_menu').not($next).slideUp().parent().removeClass('open');
			};
		}
			var accordion = new Accordion($('.avn_sitebar'), false);
		});



	});
})( jQuery );










