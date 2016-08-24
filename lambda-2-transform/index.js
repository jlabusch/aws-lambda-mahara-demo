exports.handler = function(event, context, next){
    console.log(JSON.stringify(event));

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
            if (rec.length < 5){
                console.info('Less than 5 fields, skipping ' + JSON.stringify(rec));
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

        console.log(JSON.stringify(post_data));
        next && next(null, post_data);
    });
}

