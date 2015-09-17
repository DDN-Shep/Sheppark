;(function() {
  'use strict';

  var $window = $('.plx'),
      $nav = $('.navbar'),
      $header = $('header'),
      $top = $('#back-to-top'),
      toggle = function() {
        var top = $window.scrollTop(),
            small = 'small';
        
        if (top > 50) {
          $header.addClass(small);
          $top.fadeIn();

          if (top > 300) $nav.addClass(small);
          else $nav.removeClass(small);
        }
        else {
          $header.removeClass(small);
          $top.fadeOut();
        }
      },
      top = function() {
        $('.plx').animate({ scrollTop: 0 }, 600);
      };

  $top.off('click', top).on('click', top);
  $window.off('scroll', toggle).on('scroll', toggle);
})();

;(function() {
  'use strict';

  var $nav = $('#top-nav'),
      $toggle = $('#top-nav-toggle'),
      toggle = function() {
        $nav.toggleClass('hidden-md-down');
      };

  $toggle.off('click', toggle).on('click', toggle);
})();