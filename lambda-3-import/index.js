var config = require('./config.json');

exports.handler = function(event, context, next){
    console.log(JSON.stringify(event));
    console.log(config.mahara_uri);

    var http = require('superagent');

    http.post(config.mahara_uri)
        .set('Content-Type', 'application/json')
        .send(event)
        .end(next);
}

