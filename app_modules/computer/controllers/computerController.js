var express = require('express');
var path = require('path');
var router = express.Router();
var computer = require('../../computer/models/computerModel');

var view_dirname = 'computer/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/getComputers/:lab', function(req, res, next) {
	computer.findAll().then(function(computer){
    	res.json(computer);
	});
});

module.exports = router;
