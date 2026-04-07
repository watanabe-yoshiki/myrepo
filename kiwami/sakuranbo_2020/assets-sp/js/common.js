/* ------------------------------------------------------- */

/* common.js

/* ------------------------------------------------------- */

// jquery ver(1.11.1)
$j1111 = $.noConflict(true);

(function($) {
	
	'use strict';
	
	$.common = {
		// global navigation
    toggleGlobalNav: function (options) {
 			var s = $.extend({
				btn: '.js-toggle-global-nav',
        nav: '.js-global-nav',
        isExpanded: 'is-expanded'
      }, options);

      // not exist
      if (! $(s.btn)[0] || ! $(s.btn)[0]) {
        return false;
      }
      
      var btn = $(s.btn),
          nav = $(s.nav);
          
      btn.on('click', function () {
        if (nav.hasClass(s.isExpanded)) {
          // hide
          nav.removeClass(s.isExpanded);
        } else {
          // show
          nav.addClass(s.isExpanded);
        }
        
        return false;
      });
    },
    
    // swap image
		swapImage: function(options) {
			var s = $.extend({
				selector: '.js-swaps img, .js-swap',
				postfix: '-ov'
			}, options);
			$(window).unload(function() {});
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
				selector: 'a[href^="#"]:not(.js-noscrolls a, .js-noscroll), area[href^="#"]:not(.js-noscrolls area, .js-noscroll)',
				duration: 500,
				easing: 'swing'
			}, options);
			$(document).on('click', s.selector, function(e) {
				e.preventDefault();
				var anchor = $($(this).attr('href'));
				if(anchor.length) {
					$('html, body').stop().animate({
						scrollTop: anchor.offset().top
					}, s.duration, s.easing);
				}else if ($(this).hasClass('rb2019---page-top-button')) {
					$('html, body').stop().animate({
						scrollTop: 0
					}, s.duration, s.easing);
				}
			});
		},
    
		// popup window
		popupWindow: function(options) {
			var s = $.extend({
				selector: '.js-popup',
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
				selector: '.js-tab a',
				activeClass: 'is-active',
				start: 0
			}, options);
			var hash = location.hash.replace(/<[^>]+>/g, '');
			var id = new Array(), hashNum, startNum, hashTab, startTab;
			var selector = $(s.selector);
			selector.each(function(i) {
				var tab = $(this);
				var href = tab.attr('href');
				id[i] = $(href);
				if(href == hash) {
					hashNum = i;
					hashTab = tab;
				} else if(i === s.start) {
					startNum = i;
					startTab = tab;
				}
				id[i].hide();
				tab.on('click', function(e) {
					e.preventDefault();
					selector.removeClass(s.activeClass);
					id[s.currentNum].hide();
					tab.addClass(s.activeClass);
					id[i].show();
					s.currentNum = i;
				});
			});
			if(hashNum == null) {
				s.currentNum = startNum;
			} else {
				s.currentNum = hashNum;
				startTab = hashTab;
			}
			id[s.currentNum].show();
			startTab.addClass(s.activeClass);
		},
    
		// placeholder
		placeholder: function(options) {
			var s = $.extend({
				selector: '.js-placeholder',
				emptyClass: 'is-empty',
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
    
		// clickable
		clickable: function(options) {
			var s = $.extend({
				selector: '.js-clickable'
			}, options);
			$(s.selector).each(function() {
				var t = $(this);
				var a = t.find('a');
				var href = a.attr('href');
				t.on('click', function(e) {
					e.preventDefault();
					if(a.attr('target') == '_blank') {
						window.open(href);
					} else {
						location.href = href;
					}
				});
			});
		},
    
		// resize window
		resizeWindow: function(options) {
			var s = $.extend({
				bp: 960,
				func: [function() {}, function() {}]
			}, options);
			var w = $(window);
			if(typeof s.bp !== 'object') s.bp = [s.bp];
			var func = function() {
				var len = s.bp.length, act = false;
				for(var i = 0; i < len; ++i) {
					var flg = (i) ? (w.width() > s.bp[i] && w.width() <= s.bp[i - 1]) : (w.width() > s.bp[i]);
					if(flg) {
						act = true;
						s.func[i]();
					}
				}
				if(!act) s.func[len]();
			};
			var timer = false;
			w.on('load orientationchange', function() {
				func();
			}).on('resize', function() {
				if(timer !== false) clearTimeout(timer);
				timer = setTimeout(function() {
					func();
				}, 200);
			});
		},
    
    // slide nav
    slideNav: function(options) {
      var s = $.extend({
        button: '.js-slideNav > dt',
        panel: 'dd',
        klass: 'is-open'
      }, options);
      var button = $(s.button);
      button.on('click', function(e) {
        e.preventDefault();
        var t = $(this);
        t.next(s.panel).stop().slideToggle();
        t.toggleClass(s.klass);
      });
    },
		
    // go top link
		linkGoTop: function(options) {
			var s = $.extend({
				selector: '.js-gotop',
			}, options);
			$(s.selector).hide();
			$(window).scroll(function(){
				if($(this).scrollTop() > 100){
					$(s.selector).fadeIn();
				} else {
					$(s.selector).fadeOut();
				}
			});
			$(s.selector).click(function(){
				$('body,html').animate({
					scrollTop:0	
				}, 500);
				return false;	
			});
		},
    
    // tapToCall (iPhone/Android/WindowsPhone)
		tapCall: function(options) {
      var ua = navigator.userAgent;
      if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('Windows Phone') > 0){
        var s = $.extend({
          selector: '.js-tapcall',
        }, options);
        $(s.selector).each(function() {
          var telnum = $(this).text();
          $(this).html($('<a>').attr('href', 'tel:' + telnum.replace(/-/g, '')).append(telnum + '</a>'));
        });
      }
    },
    
		// tile
		/*
		* Copyright (c) 2011 Hayato Takenaka
		* Dual licensed under the MIT and GPL licenses:
		* http://www.opensource.org/licenses/mit-license.php
		* http://www.gnu.org/licenses/gpl.html
		* @author: Hayato Takenaka (https://github.com/urin/jquery.tile.js)
		* @version: 1.1.1
		*/
		tile: function(selector, columns) {
			if(selector != null) {
				var object = $(selector);
				var length = object.length;
				var tiles, $tile, max, c, h, remove, s = document.body.style, a = ['height'], last = length - 1;
				if(!columns) columns = length;
				remove = s.removeProperty ? s.removeProperty : s.removeAttribute;
				return object.each(function() {
					remove.apply(this.style, a);
				}).each(function(i) {
					c = i % columns;
					if(c == 0) tiles = [];
					$tile = tiles[c] = $(this);
					h = ($tile.css('box-sizing') == 'border-box') ? $tile.outerHeight() : $tile.innerHeight();
					if(c == 0 || h > max) max = h;
					if(i == last || c == columns - 1) {
						$.each(tiles, function() { this.css('height', max); });
					}
				});
			}
		},
    
	};
	
	// doubleTaptoGo
	/*
	* By Osvaldas Valutis, www.osvaldas.info
	* Available for use under the MIT License
	* Customized by Granfairs inc.
	*/
	;(function( $, window, document, undefined ){
	$.fn.doubleTapToGo = function( params ){
			
			if( !( 'ontouchstart' in window ) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;
			var winWidth = $(window).width();
			if( winWidth > 865 ){
				this.each( function(){
					var curItem = false;
		
					$( this ).on( 'click', function( e ){
						var item = $( this );
						if( item[ 0 ] != curItem[ 0 ] ){
							e.preventDefault();
							curItem = item;
						}
					});
		
					$( document ).on( 'click touchstart MSPointerDown', function( e ){
						var resetItem = true,
							parents	  = $( e.target ).parents();
		
						for( var i = 0; i < parents.length; i++ )
							if( parents[ i ] == curItem[ 0 ] )
								resetItem = false;
		
						if( resetItem )
							curItem = false;
					});
				});
			};
			return this;
		};
	})( $, window, document );
		
	$(function() {
    $.common.toggleGlobalNav();
		$.common.tile();
    $.common.clickable();
		$.common.scrollPage();
		$.common.linkGoTop();
	});

})($j1111);