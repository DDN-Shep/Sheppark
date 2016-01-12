var path = require('path');

module.exports = {
    development: {
        engine: {
            view: 'jade',
            style: {
                src: path.join(__dirname, 'server/scss'),
                dest: path.join(__dirname, 'client/styles'),
                outputStyle: 'compressed',
                debug: true
            }
        },
        ip: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 3000,
        path: {
            client: path.join(__dirname, 'client'),
            //favicon: path.resolve(__dirname, 'public/images/favicon.ico'),
            uploads: path.join(__dirname, 'server/uploads'),
            views: path.join(__dirname, 'server/views')
        },
        db: {
            name: 'todo',
            connection: 'todo'
        }
    }
};