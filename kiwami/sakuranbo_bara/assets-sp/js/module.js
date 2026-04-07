/* ------------------------------------------------------- */

/* module.js

/* ------------------------------------------------------- */

(function($) {
  
  'use strict';
  
  $.module = {
    
    // Home - Accordion
    accordion: function(targetArea, openBtn, closeBtn) {
      $(targetArea).hide().css({opacity: 0});
      var targetY = 0;
      
      $(openBtn).click(function(){
        $(this).hide();
        $('#'+$(this).attr('data-accordion-target')).slideDown({queue: false},600);
        $('#'+$(this).attr('data-accordion-target')).delay(150).animate({opacity: 1},300);
      });
      
      $(closeBtn).click(function(){
        var clsBtn = $(this);
        clsBtn.parent(targetArea).slideUp().hide();
        
        $(openBtn).each(function(i, elm){
          if($(elm).attr('data-accordion-target') === clsBtn.parent(targetArea).attr('id')){
            $(elm).show();
            targetY = $('[data-accordion-scroll="'+$(elm).attr('data-accordion-target')+'"]').offset().top;
          }
        });
        $("html,body").animate({scrollTop: targetY},{queue: false},600);
      });
    },
    privilege: function(){
      $('#sp-homPrivilege li').click(function(){
        $("#sp-homPrivilege [id^=sp-homPriv-]").hide();
        $('#sp-homPrivilege li').removeClass('active');
        $(this).addClass('active');
        $('#sp-homPrivilege #'+$(this).get(0).className.split(" ")[0]).show();
      });
    },
    
    /**
     *  expander
     */
    expander: function (options) {
      var config =  $.extend({
				selector: '.js-expander',
        headerSelector: '.js-expander-header',
        bodySelector: 'js-expander-body',
				isFold: true,
        foldClassName: 'is-fold'
			}, options);
      
      if (! $(config.selector)[0]) {
        return false;
      }
      
      $(config.selector).each(function () {
        
        var expander = $(this),
            expHeader = expander.find(config.headerSelector),
            expBody = expander.find(config.bodySelector);
        if (!expHeader || !expBody) {
          return true;  // continue
        }
        
        // 初期化
        if (config.isFold) {
          expander.addClass(config.foldClassName);
        }
        
        // 開閉イベント
        expHeader.on('click', function () {
          if (expander.hasClass(config.foldClassName)) {
            expander.removeClass(config.foldClassName);
          } else {
            expander.addClass(config.foldClassName);
          }
          return false;
        });
      });
    },
    
    /**
     *  read more
     */
    more: function (options) {
      var config =  $.extend({
				selector: '.js-more',
        contentsSelector: '.js-more-contents',
        buttonSelector: '.js-more-button',
        labelSelector: '.js-more-button-label',
				isFold: true,
        foldClassName: 'is-fold',
        foldText: '閉じる',
        isScrollBack: true,
        scrollbackSelector: '.js-scroll-back'
			}, options);
      
      if (! $(config.selector)[0]) {
        return false;
      }
      
      $(config.selector).each(function () {
        var component = $(this),
            contents = component.find(config.contentsSelector),
            button = component.find(config.buttonSelector),
            label = component.find(config.labelSelector),
            labelText = label.text(),
            scrollBack = button.closest(config.scrollbackSelector);

        if (!contents || !button) {
          return true;  // continue
        }
        
        // 初期化
        if (config.isFold) {
          component.addClass(config.foldClassName);
        }
        
        // 開閉イベント
        button.on('click', function () {
          if (component.hasClass(config.foldClassName)) {
            // fold -> expand
            component.removeClass(config.foldClassName);
            label.text(config.foldText);
          } else {
            // expand -> fold
            component.addClass(config.foldClassName);

            label.text(labelText);
            
            if (config.isScrollBack) {
              $('html, body').stop().animate({
                scrollTop: scrollBack.offset().top
              }, 300, 'swing');
            }
          }
          return false;
        });
      });
    },
    
    
    /**
     *  modal
     */
    modal: function (options) {
      var config = $.extend({
				selector: '.js-modal',
        openSelector: '.js-modal-open',
        closeSelector: '.js-modal-close',
        modalBodySelector: '.js-modal-body',
				isHide: true,
        hideClassName: 'is-hide',
        lockedClassName: 'is-locked'
			}, options);
      
      var scrollPosition;

      /**
       *  親Windowのスクロール位置を保存
       */
      var saveScrollPosition = function () {
        scrollPosition = $(window).scrollTop();
      };
      
      /**
       *  親Windowのスクロール位置を復元
       */
      var restoreScrollPosition = function () {
         $(window).scrollTop(scrollPosition);
      };

      /**
       *  ウィンドウ 表示
       */
      var open = function (_win) {
        if (_win.hasClass(config.hideClassName)) {
          saveScrollPosition();
          _win.removeClass(config.hideClassName);
          $('html').addClass(config.lockedClassName);
          
          // スクロール位置を先頭へ戻す
          _win.find(config.modalBodySelector).scrollTop(1);
        }
        return false;
      };

      /**
       *  ウィンドウ 非表示
       */
      var close = function (_win) {
        if (!_win.hasClass(config.hideClassName)) {
          _win.addClass(config.hideClassName);
          $('html').removeClass(config.lockedClassName);
          restoreScrollPosition();
        }
        return false;
      };

      /**
       *  初期化
       */
      var init = (function () {
        $(config.openSelector).each(function () {
          var modalWindow = $('#' + $(this).data('modal'));

          // open event
          $(this).on('click', function () {
            open(modalWindow);
          });
          
          // close event
          modalWindow.find(config.closeSelector).on('click', function () {
            close(modalWindow);
          });
        });
      })();
    },
    
    
    /**
     *  開閉可能なリスト
     *
     *  DOM format: 
     *  <div class="sp-expandableList js-expandableList">
     *    <ul class="sp-expandableListItems js-expandableListItems">
     *      <li><a href="#">...</a></li>
     *      <li><a href="#">...</a></li>
     *    </ul>
     *    <p class="sp-expandableListButton js-button"><a href="#">...</a></p>
     *  </div>
     */
    expandableList: function (options) {
      var config = $.extend({
        selector: '.js-expandableList',
        listSeletor: '.js-expandableListItems',
        btnSelector: '.js-button',
        expandedClassName: 'is-expanded',
        showItem: 6
      }, options);
      
      var component = $(config.selector),
          list = component.find(config.listSeletor),
          btn = component.find(config.btnSelector),
          btnText = btn.find('a').text(),
          listItemCount = list.find('li').length,
          showableHeight = 0;
      
      // 要素数が少ない場合はそのまま
      if (config.showItem >= listItemCount) {
        btn.addClass('hidden');
        return false;
      }
      
      // ボタンの参照をアンカーへ上書き
      btn = btn.find('a');
      
      // 表示可能な高さを算出
      list.find('li').each(function (i) {
        // break
        if (config.showItem <= i) {
          return false;
        }

        showableHeight += $(this).outerHeight();
      });

      // 表示可能件数より多い要素は非表示
      list.css({ 'maxHeight': showableHeight + 'px' });
      
      
      // toggle event
      btn.on('click', function () {
        if (component.hasClass(config.expandedClassName)) {
          // open -> close
          component.removeClass(config.expandedClassName);
          list.css({ 'maxHeight': showableHeight + 'px' });
          btn.text(btnText);
        } else {
          // close -> open
          component.addClass(config.expandedClassName);
          list.css({ 'maxHeight': '9999px' });
          btn.text('閉じる');
        }
        
        return false;
      });
    }
  };
})($j1111);
