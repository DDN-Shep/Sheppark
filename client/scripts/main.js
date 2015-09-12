;(function() {
  'use strict';

  var $window = $('.plx'),
      $nav = $('.navbar'),
      $header = $('header'),
      toggle = function() {
        if ($window.scrollTop() > 300) $nav.addClass('small');
        else $nav.removeClass('small');
        
        if ($window.scrollTop() > 50) $header.addClass('small');
        else $header.removeClass('small');
      };
  
  $window.off('scroll', toggle).on('scroll', toggle);
})();