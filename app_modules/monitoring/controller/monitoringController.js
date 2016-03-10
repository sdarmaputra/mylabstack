var express = require('express');
var path = require('path');
var ping = require('ping');
var router = express.Router();

var view_dirname = 'monitoring/views';
var data = [];
data.title = 'Testing';
data.site_name = config.site_name;
data.layout = path.join(config.base_layout_dirname, 'home_layout');


/* GET home page. */
router.get('/:idlab', function(req, res, next) {
	data.idlab = req.params.idlab;
	res.render(path.join(view_dirname, 'monitoring'), data);
});

router.get('/', function(req, res, next) {
	//res.render(path.join(view_dirname, 'index'), data);
	res.redirect('/monitoring/1');
});

router.get('/ping/:ip/:seq', function(req, res, next){
	var host = req.params.ip;
	ping.sys.probe(host, function(isAlive){
        var msg = isAlive ? 'alive' : 'dead ';
        res.json({seq: req.params.seq,ip: host,message: msg});
    });
});
module.exports = router;
