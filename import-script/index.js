var data_source = {
    fetch: function(config, next){
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
                        next && next(null, buffer);
                    });
                });
            });
        });

        client.connect(config);
    },
    transform: function(err, data, next){
        if (err){
            next && next(err);
            return;
        }

        var parser = require('csv-parse');

        parser(data, function(err, records){
            if (err){
                next && next(err);
                return;
            }
            var headings = null,
                post_data = {
                    users: [
                    ]
                };

            records.forEach(function(rec){

                if (rec.length < 5){
                    console.error('Less than 5 fields, skipping ' + JSON.stringify(rec));
                    return;
                }

                if (!headings){
                    headings = rec;
                    return;
                }

                var result = {},
                    i = 0;
                rec.forEach(function(r){
                    result[headings[i]] = r;
                    ++i;
                });
                post_data.users.push(result);
            });

            next && next(null, post_data);
        });
    },
    load: function(err, context, next){
        if (err){
            throw err;
        }
        console.log(context.uri);

        var http = require('superagent');

        http.post(context.uri)
            .set('Content-Type', 'application/json')
            .send(context.json)
            .end(next);
    }
};

data_source.fetch(
    {
        host:       process.env.SCRIPT_HOST,
        user:       process.env.SCRIPT_USER,
        password:   process.env.SCRIPT_PASS
    },
    function(err, raw){
        data_source.transform(err, raw, function(err, json){
            data_source.load(
                err,
                {uri: process.env.SCRIPT_MAHARA, json: json},
                function(err, res){
                    if (err){
                        console.error(err);
                    }else{
                        console.log('Status: ' + res.status);
                    }
                }
            );
        });
    }
);
