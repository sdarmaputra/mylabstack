var express = require('express');
var path = require('path');
var router = express.Router();
var lab_model = require('../../lab/models/labModel');

var view_dirname = 'lab/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/getLabs', function(req, res, next) {
	lab_model.findAll().then(function(labs){
    	res.json(labs);
	});
});

router.get('/getLab/:name', function(req, res, next) {
	lab_model.findOne({ where: {name: req.params.name} }).then(function(lab) {
		res.json(lab);
	});
});

router.get('/', function(req, res, next) {
	res.render(path.join(view_dirname, 'index'), data);
});

module.exports = router;
