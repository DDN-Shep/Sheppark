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

          if (top > 250) $nav.addClass(small);
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

$(function() {
  'use strict';

  var get = function get(url, options) {
    return new Promise(function(resolve, reject) {
      var o = options || {},
          req = new XMLHttpRequest();

      if (o.config) {
        // TODO
      }

      req.open('GET', url, true);
      req.onload = function() {
        if (req.status >= 200 && req.status < 400) {
          resolve(req.responseText, req.status);
        } 
        else {
          reject(Error(req.statusText), req.responseText, req.status);
        }
      };

      req.onerror = function() {
        reject(Error('Connection error'));
      };

      req.send();
    });
  };

  var router = function router(collection, id, action) {
    console.log('router', collection, id, action);
    //console.log(this);
    
    //get('')
  };

  riot.route(router);
  riot.mount('blog', { section: 'home' });
  riot.route.exec(router);
});