var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var ipRange = loadModel('ipRange');
var lab = loadModel('lab');

var view_dirname = 'ipRange/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
	ipRange.findAll({ include: [lab] }).then(function(ipRanges) {
		data.ipRanges = ipRanges;
		res.render(path.join(view_dirname, 'index'), data);
	});
});

router.get('/create', function(req, res, next) {
	data.ipRange = [];
	data.url = '/ipRange/store';
	lab.findAll().then(function(labs) {
		data.labs = [];
		data.labs.push({value: 0, text: '- Select Lab -'});
		labs.forEach(function(lab, index, arr) {
			var arrayLab = {};
			arrayLab['value'] = lab.idlab;
			arrayLab['text'] = lab.name;
			data.labs.push(arrayLab);
		});
		res.render(path.join(view_dirname, 'create'), data);
	});
});

router.post('/store', function(req, res, next) {
	ipRange.create(req.body).then(function() {
		res.redirect('/ipRange');
	});
});

router.get('/edit/:idip_list', function(req, res, next) {
	ipRange.findOne({ where: {idip_list: req.params.idip_list} }).then(function(ipRange) {
		data.ipRange = ipRange;
		data.url = "/ipRange/update/"+req.params.idip_list;
		lab.findAll().then(function(labs) {
			data.labs = [];
			data.labs.push({value: 0, text: '- Select Lab -'});
			labs.forEach(function(lab, index, arr) {
				var arrayLab = {};
				arrayLab['value'] = lab.idlab;
				arrayLab['text'] = lab.name;
				data.labs.push(arrayLab);
			});
			res.render(path.join(view_dirname, 'edit'), data);
		});
	});
});

router.post('/update/:idip_list', function(req, res, next) {
	ipRange.update(req.body, { where: {idip_list: req.params.idip_list } }).then(function(){
		res.redirect('/ipRange/edit/'+req.params.idip_list);
	});
});

router.get('/destroy/:idip_list', function(req, res, next){
	ipRange.destroy({ where: {idip_list: req.params.idip_list} }).then(function(){
		res.redirect('/ipRange');
	});
});

/* GET home page. */
router.get('/getIpRanges/:idlab', function(req, res, next) {
	lab.findOne({ where: {idlab: req.params.idlab} , include: [ ipRange ] }).then(function(ipRange) {
		res.json(ipRange);
	});
});

module.exports = router;
