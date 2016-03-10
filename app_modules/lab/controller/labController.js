var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var lab = loadModel('lab');
var user = loadModel('user');

var view_dirname = 'lab/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	lab.findAll().then(function(labs) {
		data.labs = labs;
		res.render(path.join(view_dirname, 'index'), data);
	});
});

router.get('/create', function(req, res, next) {
	data.lab = [];
	data.url = '/lab/store';
	res.render(path.join(view_dirname, 'create'), data);
});

router.post('/store', function(req, res, next) {
	lab.create(req.body).then(function() {
		res.redirect('/lab');
	});
});

router.get('/edit/:idlab', function(req, res, next) {
	lab.findOne({ where: { idlab: req.params.idlab } }).then(function(lab) {
		data.url = '/lab/update/'+req.params.idlab;
		data.lab = lab;
		res.render(path.join(view_dirname, 'edit'), data);
	});
});

router.post('/update/:idlab', function(req, res, next) {
	lab.update(req.body, { where: { idlab: req.params.idlab } }).then(function() {
		res.redirect('/lab/edit/'+req.params.idlab);
	});
});

router.get('/destroy/:idlab', function(req, res, next) {
	lab.destroy({ where: { idlab: req.params.idlab } }).then(function() {
		res.redirect('/lab');
	});
});

/* GET home page. */
router.get('/getLabs', function(req, res, next) {
	lab.findAll({ include: [user] }).then(function(labs) {
		res.json(labs);
	});
});

router.get('/getLab/:name', function(req, res, next) {
	lab.findOne({ where: {name: req.params.name} }).then(function(lab) {
		res.json(lab);
	});
});

router.get('/', function(req, res, next) {
	res.render(path.join(view_dirname, 'index'), data);
});

module.exports = router;
