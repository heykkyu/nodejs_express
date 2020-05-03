// server.js some functions are deleted for privacy.

var fs = require('fs');
var path = require('path');
var Q = require('q');
var express = require('express');
var bodyParser = require('body-parser');
var port = 9999;
var commentsPerPage = 5 + Math.round(Math.random() * 5);
var commentFile = path.join(__dirname, 'comments.json');

var app = express();
app.use('/', express.static(path.join(__dirname, 'src')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Cache-Control', 'no-cache');
});
// list
app.get('/api/comments', function (req, res) {


});
// write
app.post('/api/comments', function (req, res) {
    
});
// paging
app.get('/api/comments/page/:page', function (req, res) {
    
});
app.listen(port, function () {
    console.log('Server started: http://localhost:' + port + '/');
});