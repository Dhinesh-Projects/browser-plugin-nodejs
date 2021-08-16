const http = require('http');
var url = require('url');
var fs = require('fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Access-Control-Allow-Origin' : '*' });
    console.log('Request recived - ' + req.url)
    var q = url.parse(req.url, true).query;
    var txt = '';
    var qStr = '';
    var badRequest = 0;
    var data = new Object();
    var txnId = '';
    var service = '';
    var step = '';

    for (var key in q) {
        qStr = key + ' - ' + q[key];
        console.log(qStr);
        data[key] = q[key];
        switch (key) {
            case 'txnId': txnId = q[key]; break;
            case 'service': service = q[key]; break;
            case 'step': step = q[key]; break;
            default: badRequest = 1;
        }
    }

    console.log("Hitting for service - " + service);

    if (service == 'Vaahan') {
        try {
            res.writeHead(200, {'Content-Type': 'text/html'});
            // var tmpFileName = './lib/' + service.toLowerCase() + '/' + step;
            var tmpFileName = '/home/dhinesh/node_ws/adapter-plugin/nbf_server/server/lib/vaahan/login';
            console.log("sending " + tmpFileName);
            fs.readFile(tmpFileName, 'utf8', function(err, data1) {
                res.end(data1);
                console.log('Shown 200 page');
            });
        } catch (err) {
            logger(err);
            _res.writeHead(404, {'Content-Type': 'text/html'});
            fs.readFile('./404.html', 'utf8', function(err, data1) {
                _res.end(data1);
                console.log('Shown 404 page not found')
            });
        }
        // res.write('<html>');
        // res.write('<head><title>Demo Page</title></head>');
        // res.write('<body><h1>Demo Page</h1></body>');
        // res.write('</html>');
        // res.end();
    } else {
        res.write('<html>');
        res.write('<head><title>Invalid Page</title></head>');
        res.write('<body><h1>404 Invalid Page</h1></body>');
        res.write('</html>');
        res.end();
    }
});

server.listen(3030);