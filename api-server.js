var app = require('express')();
var http = require('http').Server(app);
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var config = require('./config');
var dir = config.DIRECTORY;

app.all('/:dir?', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/:dir?', function(req, res){
    var child_directory = req.params.dir;
    if(!child_directory) child_directory = '';

    var re = new RegExp(',', 'g');
    child_directory = child_directory.replace(re, '\\');
    var directory = path.join(dir, child_directory);

    try {
        fs.accessSync(directory, fs.F_OK);

        if(fs.lstatSync(directory).isDirectory()) {
            var files = fs.readdirSync(directory);
            var tmpDirectory = [];
            var tmpFile = [];
            var counter = 0;

            files.forEach(function (data) {
                var stats = fs.statSync(path.join(directory, data));
                var id = crypto.createHash('md5').update(counter + data + stats['size'] + stats['ctime']).digest('hex');

                var size = parseInt(stats['size'], 10);
                if (stats.isDirectory())
                    size = '-';
                else if (size > 1024 && size < Math.pow(1024, 2))
                    size = (size / 1024).toFixed(1).toString() + ' KB';
                else if (size >= Math.pow(1024, 2) && size < Math.pow(1024, 3))
                    size = ((size / 1024) / 1024).toFixed(1).toString() + ' MB';
                else if (size >= Math.pow(1024, 3))
                    size = (((size / 1024) / 1024) / 1024).toFixed(1).toString() + ' GB';
                else
                    size = size.toString() + ' bytes';

                var ctime = stats['ctime'].toJSON().substring(0,10) + ' ' + stats['ctime'].toJSON().substring(11,16);

                if(stats.isDirectory())
                    var icon = './assets/icon/directory.svg';
                else{
                    var ext = data.split('.').pop();
                    var icon_path = path.join(__dirname, './assets/icon/'+ext+'.svg');
                    if(fs.existsSync(icon_path))
                        icon = './assets/icon/'+ext+'.svg';
                    else
                        icon = './assets/icon/blank.svg';
                }

                var item = {
                    'id': id,
                    'name': data,
                    'size': size,
                    'ctime': ctime,
                    'isDirectory': stats.isDirectory(),
                    'iconPath': icon,
                };

                if (stats.isDirectory()) {
                    tmpDirectory.push(item);
                }
                else {
                    tmpFile.push(item);
                }

                counter = counter + 1;
            });

            var result = tmpDirectory.concat(tmpFile);

            res.json({
                'status': 'ok',
                'result': result,
            });
        }
        else if(fs.lstatSync(directory).isFile()){
            res.download(directory);
        }
    } catch (e) {
        res.json({
                'status' : 'error',
                'error' : e,
                'result' : [],
            });
    }
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});