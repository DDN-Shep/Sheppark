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
        //todo: require('./server/routes/api/todo')
    },
    index: require('./server/routes/index')
};

require('./server/socket/server')(server);

app.set('views', config.path.views);
app.set('view engine', config.engine.view);

app.use(express.static(config.path.client));

app.use('/', routes.index);

app.use('*', function(req, res, next) {
    // 404
});

server.listen(config.port, config.ip, function() {
    var addr = server.address();

    console.log('Sheppark server listening at', addr.address + ':' + addr.port);
});
