var config = require('./config.json');

exports.handler = function(event, context, callback){
    chain(fetch, transform, load, callback)(null, event);
}

function chain(){
    var list = Array.prototype.slice.call(arguments, 0);

    function __next(err, res){
        var f = list.shift();
        if (!f){
            return;
        }
        f(err, res, __next);
    }

    return __next;
}

function fetch(err, ev, next){
    if (err){
        console.error(err);
        process.exit(1);
    }

    if (ev && ev.fake === true){
        next && next(null, {data: 'email,username,firstname,lastname'});
        return;
    }

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

function transform(err, event, next){
    if (err){
        console.error(err);
        process.exit(1);
    }

    var parser = require('csv-parse');

    parser(event.data, function(err, records){
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
            if (rec.length < 4){
                console.info('Less than 4 fields, skipping ' + JSON.stringify(rec));
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
            result.password = result.password || 'xxxxxx'; // nope, not generating real passwords for a demo
            post_data.users.push(result);
        });

        next && next(null, post_data);
    });
}

function load(err, event, next){
    if (err){
        console.error(err);
        process.exit(1);
    }

    var http = require('superagent');

    http.post(config.mahara_uri)
        .set('Content-Type', 'application/json')
        .send(event)
        .end(next);
}

