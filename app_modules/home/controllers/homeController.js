var express = require('express');
var path = require('path');
var ping = require('ping');
var router = express.Router();
var lab = require('../../lab/models/labModel');
var computer = require('../../computer/models/computerModel');
var category = require('../../category/models/categoryModel');

var view_dirname = 'home/views';
var data = [];
data.title = 'Testing';
data.site_name = 'My LabStack';
data.layout = '../base_views/layouts/home_layout';


/* GET home page. */
router.get('/monitoring/:name', function(req, res, next) {
	data.lab = req.params.name;
	res.render(path.join(view_dirname, 'monitoring'), data);
});

router.get('/', function(req, res, next) {
	//res.render(path.join(view_dirname, 'index'), data);
	res.redirect('/monitoring/ajk');
});

router.get('/ping/:ip/:seq', function(req, res, next){
	var host = req.params.ip;
	ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'alive' : 'dead ';
        res.json({seq: req.params.seq,ip: host,message: msg});
    });
});
module.exports = router;
