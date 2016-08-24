var config = require('./config.json');

exports.handler = function(event, context, next){
    var ftp = require('ftp');

    var client = new ftp();

    client.on('ready', function(){
        client.list(function(err, list){
            if (err){
                next && next(err);
                return;
            }
            client.get('mahara_users.csv', function(err, stream){
                if (err){
                    next && next(err);
                    return;
                }
                var buffer = '';
                stream.on('data', function(chunk){
                    buffer = buffer + chunk.toString();
                });
                stream.on('error', function(err){
                    next && next(err);
                });
                stream.once('close', function(){
                    client.end();
                    console.error('Got buffer with ' + buffer.length + ' bytes');
                    next && next(null, {data: buffer});
                });
            });
        });
    });

    client.connect(config);
}

