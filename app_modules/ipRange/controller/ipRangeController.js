var express = require('express');
var path = require('path');
var router = express.Router();
var ipRange = loadModel('ipRange');
var lab = loadModel('lab');

var view_dirname = 'lab/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/getIpRanges/:idlab', function(req, res, next) {
	lab.findOne({ where: {idlab: req.params.idlab} , include: [ ipRange ] }).then(function(ipRange) {
		res.json(ipRange);
	});
});

module.exports = router;
