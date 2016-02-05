var express = require('express');
var path = require('path');
var router = express.Router();
var computer = require('../../computer/models/computerModel');
var lab = require('../../lab/models/labModel');
var category = require('../../category/models/categoryModel');

var view_dirname = 'computer/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/getComputers/:name', function(req, res, next) {
	lab.findOne({ where: {name: req.params.name} , include: [ computer ] }).then(function(lab) {
		res.json(lab);
	});
});

module.exports = router;
