var express = require('express');
var path = require('path');
var router = express.Router();
var service = loadModel('service');
var computer = loadModel('computer');

var view_dirname = 'service/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/getServices/:idcomputer', function(req, res, next) {
	computer.findOne({ where: {idcomputer: req.params.idcomputer} , include: [ service ] }).then(function(service) {
		res.json(service);
	});
});

module.exports = router;
