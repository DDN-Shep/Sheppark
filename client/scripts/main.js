;(function() {
  'use strict';
  
  this.bh = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace(['title']),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(o) { return o._id; },
    sufficient: 5,
    prefetch: {
      url: '/api/blog',
      cache: true,
      ttl: 86400000 // ms in 1 Day
    },
    remote: {
      url: '/api/blog?q=%QUERY',
      wildcard: '%QUERY'
    }
  });
  
  this.bh.get = function() {
    var get = this.get;
    
    return function get(q, sync, async) {
      return q && (this.q = q) ? get.apply(this, arguments) 
        : this.q ? get.call(this, this.q, sync, async)
        : this.index.datums;
    }.bind(this);
  }.call(this.bh);
  
}).call(window);

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

$(function() {
  'use strict';
  
  var router = function router(collection, id, action) {
    console.log('router', collection, id, action);
    //console.log(this);
    
    //get('')
  };

  riot.route(router);
  riot.mount('blog', { section: 'home' });
  riot.mount('blog-search', {});
  riot.route.exec(router);
});

/*
;(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', # {
    ga.ru.code
}, 'auto');
ga('send', 'pageview');
*/