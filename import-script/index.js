var config = {
    host:       process.env.SCRIPT_HOST,
    user:       process.env.SCRIPT_USER,
    password:   process.env.SCRIPT_PASS
};

var data_source = {
    fetch: function(handler){
        var ftp = require('ftp');

        var client = new ftp();

        client.on('ready', function(){
            client.list(function(err, list){
                if (err){
                    throw err;
                }
                client.get('mahara_users.csv', function(err, stream){
                    if (err){
                        throw err;
                    }
                    var buffer = '';
                    stream.on('data', function(chunk){
                        buffer = buffer + chunk.toString();
                    });
                    stream.on('error', function(err){
                        throw err;
                    });
                    stream.once('close', function(){
                        client.end();
                        console.error('Got buffer with ' + buffer.length + ' bytes');
                        handler(buffer);
                    });
                });
            });
        });

        client.connect(config);
    },
    transform: function(data, next){
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

            next(null, post_data);
        });
    }
};

data_source.fetch(
    function(raw){
        data_source.transform(raw, function(err, res){
            if (err){
                throw err;
            }
            console.log(JSON.stringify(res, null, 4));
        });
    }
);
