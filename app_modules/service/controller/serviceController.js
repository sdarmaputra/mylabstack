var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var service = loadModel('service');
var computer = loadModel('computer');
var lab = loadModel('lab');

var view_dirname = 'service/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	service.findAll({ include: [{ model: computer, include: [{ model: lab }] }] }).then(function(services) {
		data.services = services;
		res.render(path.join(view_dirname, 'index'), data);
	});
});

router.get('/create', function(req, res, next) {
	data.service = [];
	data.url = '/service/store';
	computer.findAll().then(function(computers) {
		data.computers = [];
		data.computers.push({value: 0, text: '- Select Computer -'});
		computers.forEach(function(computer, index, arr) {
			var arrayComputer = {};
			arrayComputer['value'] = computer.idcomputer;
			arrayComputer['text'] = computer.ipv4_addr + ' (' + computer.name + ')';
			data.computers.push(arrayComputer);
		});
		res.render(path.join(view_dirname, 'create'), data);
	});
});

router.post('/store', function(req, res, next) {
	service.create(req.body).then(function() {
		res.redirect('/service');
	});
});

router.get('/edit/:idservice', function(req, res, next) {
	service.findOne({ where: {idservice: req.params.idservice} }).then(function(service) {
		data.service = service;
		data.url = "/service/update/"+req.params.idservice;
		computer.findAll().then(function(computers) {
			data.computers = [];
			data.computers.push({value: 0, text: '- Select Computer -'});
			computers.forEach(function(computer, index, arr) {
				var arrayComputer = {};
				arrayComputer['value'] = computer.idcomputer;
				arrayComputer['text'] = computer.ipv4_addr + ' (' + computer.name + ')';
				data.computers.push(arrayComputer);
			});
			res.render(path.join(view_dirname, 'edit'), data);
		});
	});
});

router.post('/update/:idservice', function(req, res, next) {
	service.update(req.body, { where: {idservice: req.params.idservice } }).then(function(){
		res.redirect('/service/edit/'+req.params.idservice);
	});
});

router.get('/destroy/:idservice', function(req, res, next){
	service.destroy({ where: {idservice: req.params.idservice} }).then(function(){
		res.redirect('/service');
	});
});

/* GET home page. */
router.get('/getServices/:idcomputer', function(req, res, next) {
	computer.findOne({ where: {idcomputer: req.params.idcomputer} , include: [ service ] }).then(function(service) {
		res.json(service);
	});
});

module.exports = router;
