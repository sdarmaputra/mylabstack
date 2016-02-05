var express = require('express');
var path = require('path');
var router = express.Router();
var category = require('../../category/models/categoryModel');

var view_dirname = 'category/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/getCategories', function(req, res, next) {
	category.findAll().then(function(category){
    	res.json(category);
	});
});

module.exports = router;
