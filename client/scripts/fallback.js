;(function() {
  'use strict';

  var a = 'data-alt-src', src;

  this.fallback = function() {
    if (!(src = this.getAttribute(a))) return;
    
    this.removeAttribute(a);
    this.src = src;
  };
  
}).call(window);