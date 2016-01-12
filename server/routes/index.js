var express = require('express');

module.exports = (function() {
  this.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  this.get('/', function(req, res) {
    res.render('home/index');
  });
  
  return this;
}).call(express.Router());
