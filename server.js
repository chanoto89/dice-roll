var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

var distDir = __dirname + '/dist/';
app.use(express.static(distDir));

app.set('view engine', 'html');

app.get('*', function(req, res) {
    res.sendfile(distDir + 'index.html');
});

http.listen(port, function() {
    console.log('Listening on port ', port);
});