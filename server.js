var fs = require('fs');
var path = require('path');
var Q = require('q');
var express = require('express');
var bodyParser = require('body-parser');
var port = 9999;
var commentsPerPage = 5 + Math.round(Math.random() * 5);
var commentFile = path.join(__dirname, 'comments.json');
