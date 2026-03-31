/* ------------------------------------------------------- */

/* common.js

/* ------------------------------------------------------- */

// jquery ver(1.11.1)
$j1111 = $.noConflict(true);

(function($) {

	'use strict';

	var win = $(window), doc = $(document);

	$.common = {
		// swap image
		swapImage: function(options) {
			var s = $.extend({
				selector: '.swpImgs img, .swpImg',
				postfix: '-ov'
			}, options);
			win.unload(function() {});
			var images = $(s.selector);
			images.each(function() {
				this.defaultSrc = $(this).attr('src');
				this.hoverSrc = this.defaultSrc.replace(new RegExp('(' + s.postfix + ')?(\.gif|\.jpg|\.png)$'), s.postfix + '$2');
				this.swapImage = new Image;
				this.swapImage.src = this.hoverSrc;
			});
			images.hover(
				function() {
					$(this).attr({ src: this.hoverSrc });
				},
				function() {
					$(this).attr({ src: this.defaultSrc });
				}
			);
		},
		// scroll page
		scrollPage: function(options) {
			var s = $.extend({
				selector: 'a[href^="#"]:not(.noscrolls a, .noscroll), area[href^="#"]:not(.noscrolls area, .noscroll)',
				duration: 500,
				easing: 'swing'
			}, options);
			doc.on('click', s.selector, function(e) {
				e.preventDefault();
				var anchor = $($(this).attr('href'));
				if(anchor.length) {
					$('html, body').stop().animate({
						scrollTop: anchor.offset().top
					}, s.duration, s.easing);
				}
			});
		},
		// popup window
		popupWindow: function(options) {
			var s = $.extend({
				selector: '.popup',
				name: '',
				width: 800,
				height: 600
			}, options);
			$(s.selector).on('click', function(e) {
				e.preventDefault();
				window.open(this.href, s.name, 'scrollbars=yes,resizable=yes,toolbar=no,location=no,directories=no,status=yes,menubar=no,width=' + s.width + ',height=' + s.height);
			});
		},

		// tab
    	tab: function(options) {
			var s = $.extend({
				selector: '.sel-hdTab > li > a',
				activeClass: 'active',
				start: -1,
				func: null
			}, options);
      var hash = location.hash.replace(/<[^>]+>/g, '');
			var id = new Array(), hashNum, startNum, hashTab, startTab;
			var selector = $(s.selector);
			selector.each(function(i) {
				var tab = $(this);
				var href =  '#' + tab.attr('class');
				id[i] = $(href);
				if(href == hash) {
					hashNum = i;
					hashTab = tab;
				} else if(i === s.start) {
					startNum = i;
					startTab = tab;
				}
				id[i].hide();
				if(href==tab.attr('href')){
          tab.on('click', function(e) {
            e.preventDefault();
            selector.removeClass(s.activeClass);
            id[s.currentNum].hide();
            tab.addClass(s.activeClass);
            id[i].show();
            s.currentNum = i;
            if(s.func) s.func();
          });
        }
			});
			if(hashNum == null) {
				s.currentNum = startNum;
			} else {
				s.currentNum = hashNum;
				startTab = hashTab;
			}
      if(id[s.currentNum]){
        id[s.currentNum].show();
        startTab.addClass(s.activeClass);
      }
		},
		// placeholder
		placeholder: function(options) {
			var s = $.extend({
				selector: '.placeholder',
				emptyClass: 'empty',
				emptyFlg: true
			}, options);
			$(s.selector).each(function() {
				var input = $(this);
				var title = input.attr('title');
				input.emptyFlg = s.emptyFlg;
				if(input.emptyFlg || input.val() == '') {
					input.emptyFlg = true;
					input.val(title);
					input.addClass(s.emptyClass);
				}
				input.on('focus', function() {
					if(input.emptyFlg && input.val() == title) {
						input.val('');
						input.removeClass(s.emptyClass);
					}
				}).on('blur', function() {
					if(input.val() == '') {
						input.emptyFlg = true;
						input.val(title);
						input.addClass(s.emptyClass);
					} else {
						input.emptyFlg = false;
					}
				});
			});
		},
		// my menu
		myMenu: function(options) {
			var s = $.extend({
				button: '#sel-hdMyMenu > a',
				panel: 'div'
			}, options);
			var button = $(s.button);
			var panel = button.next(s.panel);
			button.on('click', function(e) {
				e.preventDefault();
				panel.stop().fadeToggle();
			});
			doc.on('click', function(e) {
				if(!$.contains(button.parent().get(0), e.target)) {
					panel.stop().fadeOut();
				}
			});
		},
		// mega menu
		megaMenuSettings: {
			button: '.sel-hdButton',
			activeClass: 'active_02',
			panel: '.sel-hdPanel',
			close: '.sel-hdClose',
			overlay: 'sel-overlay',
			current: null
		},
		megaMenu: function() {
			var s = $.common.megaMenuSettings;
			$('body').append('<div id="' + s.overlay + '"></div>');
			var overlay = $('#' + s.overlay).hide();
			var button = $(s.button);
			s.current = null;
			button.on('click', function(e) {
				e.preventDefault();
				var t = $(this);
				var panel = t.next(s.panel);
				if(s.current && panel.is(s.current)) {
					$.common.megaMenuClosePanel();
				} else {
					button.removeClass(s.activeClass);
					t.addClass(s.activeClass);
					if(s.current) s.current.stop().fadeOut();
					panel.stop().fadeIn();
					overlay.fadeIn();
					s.current = panel;
				}
			});
			$(s.close).on('click', function(e) {
				$.common.megaMenuClosePanel();
			});
			overlay.on('click', function(e) {
				$.common.megaMenuClosePanel();
			});
		},
		megaMenuClosePanel: function() {
			var s = $.common.megaMenuSettings;
			$(s.button).removeClass(s.activeClass);
			$(s.panel).stop().fadeOut();
			$('#' + s.overlay).fadeOut();
			s.current = null;
		},
		// float banner
		floatBanner: function(options) {
			var s = $.extend({
				wrap: '#sel-wrapper',
				banner: '#sel-banner',
				button: '#sel-banner li',
				panel: 'div',
				duration: 500,
				width: 1210,
				marginTop: 20,
				delay: 500
			}, options);
			var wrap = $(s.wrap), banner = $(s.banner), timer = false;
			var min = wrap.offset().top;
			var max = min + wrap.height() - banner.height() - parseInt(banner.css('top')) * 2;
			var marginBottom = max - min;
			var switchDisplay = function() {
				var w = win.width();
				if(w < s.width) banner.hide();
				else banner.show();
			};
			switchDisplay();
			win.on({
				scroll: function() {
					var top = win.scrollTop();
					if(top > min && top < max) {
						var marginTop = top - min;
						banner.animate({ 'margin-top': marginTop }, { duration: s.duration, queue: false });
					} else if(top < min) {
						banner.animate({ 'margin-top': s.marginTop }, { duration: s.duration, queue: false });
					} else if(top > max) {
						banner.animate({ 'margin-top': marginBottom }, { duration: s.duration, queue: false });
					}
				},
				resize: function() {
					if(timer !== false) clearTimeout(timer);
					timer = setTimeout(function() {
						switchDisplay();
					}, s.delay);
				}
			});
			$(s.button).on({
				mouseenter: function() {
					$(this).children(s.panel).stop().fadeIn();
				},
				mouseleave: function(e) {
					$(this).children(s.panel).stop().fadeOut();
				}
			});
		},
		// slide nav
		slideNav: function(options) {
			var s = $.extend({
				button: '.sel-sbListB > li > a',
				panel: 'ul',
				klass: 'open'
			}, options);
			var button = $(s.button);
			button.on('click', function(e) {
				e.preventDefault();
				var t = $(this);
				t.next(s.panel).stop().slideToggle();
				t.toggleClass(s.klass);
			});

			var s2 = $.extend({
				button: '.sel-sbListC > li > a.lower',
				panel: 'ul',
				klass: 'open'
			}, options);
			var button = $(s2.button);
			button.on('click', function(e) {
				e.preventDefault();
				var t = $(this);
				t.next(s2.panel).stop().slideToggle();
				t.toggleClass(s2.klass);
			});
		},
		// slide panel
		slidePanel: function(options) {
			var s = $.extend({
				button: '#sel-ftButton a',
				panel: '#sel-ftList > div',
				klass: 'open'
			}, options);
			var button = $(s.button), panel = $(s.panel);
			button.on('click', function(e) {
				e.preventDefault();
				panel.stop().slideToggle();
				button.toggleClass(s.klass);
			});
		},
    // clickable
    clickable: function(options) {
      var s = $.extend({
        selector: '.clickable'
      }, options);
      $(s.selector).each(function() {
        var t = $(this);
        var href = t.find('a').attr('href');
        t.on('click', function(e) {
          location.href = href;
        });
      });
    },
		// tile
		/*
		* Copyright (c) 2011 Hayato Takenaka
		* Dual licensed under the MIT and GPL licenses:
		* http://www.opensource.org/licenses/mit-license.php
		* http://www.gnu.org/licenses/gpl.html
		* @author: Hayato Takenaka (http://urin.take-uma.net)
		* @version: 0.0.2
		*/
		tile: function(selector, columns) {
			if(selector != null) {
				var object = $(selector);
				var length = object.length;
				var tiles, max, c, h, last = length - 1, s;
				if(columns == null) columns = length;
				object.each(function(i) {
					s = this.style;
					if(s.removeProperty) s.removeProperty('height');
					if(s.removeAttribute) s.removeAttribute('height');
					c = i % columns;
					if(c == 0) tiles = [];
					tiles[c] = $(this);
					h = tiles[c].height();
					if(c == 0 || h > max) max = h;
					if(i == last || c == columns - 1) {
						$.each(tiles, function() { this.height(max); });
					}
				});
			}
		}
	};

  $(function() {
    $.common.scrollPage();
    $.common.swapImage();
    $.common.megaMenu();
    $.common.floatBanner();
    $.common.slideNav();
    $.common.slidePanel();
  });

})($j1111);
