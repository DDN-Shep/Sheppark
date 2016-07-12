var express = require('express'),
    busboy = require('busboy'),
    path = require('path'),
    fs = require('fs');

module.exports = (function() {
  this.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });
  
  var posts;
  
  this.use(function fetchData(req, res, next) {
    if (!posts) fs.readFile(path.join(__dirname, '../../test/data/posts.json'), 'utf8', function(err, data) {
      if (err) throw err;
      
      posts = JSON.parse(data);
      next();
    });
    else next();
  });

  this.get('/', function(req, res) {
    console.log('Get posts: ', req.query.q);
    
    var q = req.query.q,
        regex;
        
    res.json(q && (regex = new RegExp(q, 'gi')) ? posts.filter(function(value) {
      return value && value.title && value.title.search(regex) >= 0;
    }) : posts.slice(0));
  });

  this.post('/', function(req, res) {
    var bb = new busboy({ headers: req.headers });
    
    bb.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    
    bb.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + val); // TODO: Include "util"? // inspect(val)
    });
    
    bb.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });
      res.end();
    });
    
    req.pipe(bb);
  });
  
  return this;
}).call(express.Router());
