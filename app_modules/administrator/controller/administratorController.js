var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var user = loadModel('user');

var view_dirname = 'user/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My userStack';
data.layout = '../base_views/layouts/home_layout';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	res.redirect('/user');
});

module.exports = router;
