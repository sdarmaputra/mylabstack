var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var category = loadModel('category');

var view_dirname = 'category/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	category.findAll().then(function(categories) {
		data.categories = categories;
		res.render(path.join(view_dirname, 'index'), data);
	});
});

router.get('/create', function(req, res, next) {
	data.category = [];
	data.url = '/category/store';
	res.render(path.join(view_dirname, 'create'), data);
});

router.post('/store', function(req, res, next) {
	category.create(req.body).then(function() {
		res.redirect('/category');
	});
});

router.get('/edit/:idcategory', function(req, res, next) {
	category.findOne({ where: { idcategory: req.params.idcategory } }).then(function(category) {
		data.category = category;
		data.url = '/category/update/'+req.params.idcategory;
		res.render(path.join(view_dirname, 'edit'), data);
	});
});

router.post('/update/:idcategory', function(req, res, next) {
	category.update(req.body, { where: { idcategory: req.params.idcategory } }).then(function() {
		res.redirect('/category/edit/'+req.params.idcategory);
	});
});

router.get('/destroy/:idcategory', function(req, res, next) {
	category.destroy({ where: { idcategory: req.params.idcategory } }).then(function() {
		res.redirect('/category');
	});
});

/* GET category list. */
router.get('/getCategories', function(req, res, next) {
	category.findAll().then(function(category){
    	res.json(category);
	});
});

module.exports = router;
