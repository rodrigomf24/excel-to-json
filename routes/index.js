var express = require('express');
var router = express.Router();
var excelParser = require('excel-parser');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
