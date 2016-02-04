var express = require('express');
var router = express.Router();
var data = [];
data.title = 'Testing';
data.layout = '../base_view/layouts/layout2';
var view_dirname = 'home/views/'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(view_dirname+'index', data);
});

module.exports = router;
