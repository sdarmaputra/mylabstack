var express = require('express');
var path = require('path');
var router = express.Router();
var user = require('../../user/models/userModel');

var view_dirname = 'user/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/getUsers', function(req, res, next) {
	user.findAll().then(function(user) {
		res.json(user);
	});
});

module.exports = router;
