var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var computer = loadModel('computer');
var lab = loadModel('lab');
var category = loadModel('category');

var view_dirname = 'computer/views';
var data = [];
data.title = 'Testing';
data.site_name = config.site_name;
data.layout = path.join(config.base_layout_dirname, 'home_layout');

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	computer.findAll({ include: [category, lab] }).then(function(computers) {
		data.computers = computers;
		res.render(path.join(view_dirname, 'index'), data);
	});
});

router.get('/create', function(req, res, next) {
	data.computer = [];
	data.url = "/computer/store";
	res.render(path.join(view_dirname, 'create'), data);
});

router.post('/store', function(req, res, next) {
	computer.create(req.body).then(function() {
		res.redirect('/computer');
	});
});

router.get('/edit/:idcomputer', function(req, res, next) {
	computer.findOne({ where: {idcomputer: req.params.idcomputer} }).then(function(computer) {
		data.computer = computer;
		data.url = "/computer/update/"+req.params.idcomputer;
		res.render(path.join(view_dirname, 'edit'), data);
	});
});

router.post('/update/:idcomputer', function(req, res, next) {
	computer.update(req.body, { where: {idcomputer: req.params.idcomputer } }).then(function(){
		res.redirect('/computer/edit/'+req.params.idcomputer);
	});
});

router.get('/destroy/:idcomputer', function(req, res, next){
	computer.destroy({ where: {idcomputer: req.params.idcomputer} }).then(function(){
		res.redirect('/computer');
	});
});

/* GET home page. */
router.get('/getComputers/:name', function(req, res, next) {
	lab.findOne({ where: {name: req.params.name} , include: [ computer ] }).then(function(lab) {
		res.json(lab);
	});
});

router.get('/getComputersByCat/:name/:idcategory', function(req, res, next){
	lab.findOne({ where: {name: req.params.name} , include: [ computer ] }).then(function(lab) {
		res.json(lab);
	});
});

module.exports = router;
