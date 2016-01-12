var http = require('http'),
    express = require('express'),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config')[env],
    //db     = require('./server/data/db')(config),
    //auth   = require('./server/auth/authenticate'),
    app = express(),
    server = http.Server(app);

var routes = {
    api: {
        blog: require('./server/routes/api/blog')
    },
    index: require('./server/routes/index')
};

app.set('views', config.path.views);
app.set('view engine', config.engine.view);

app.use(express.static(config.path.client));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (next) next();
});

app.use('/', routes.index);

app.use('/api/blog', routes.api.blog);

app.use('*', function(req, res, next) {
    // 404
});

server.listen(config.port, config.ip, function() {
    var sa = server.address();

    console.log('Sheppark server listening at', sa.address + ':' + sa.port);
});
