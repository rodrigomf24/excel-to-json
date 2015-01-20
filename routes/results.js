/*
 * @author: Rodrigo Morales
 * @project: virtuemart
 * @year: 2014
 * @version: 0.1
 */

var express = require('express');
var router = express.Router();
var excelParser = require('excel-parser');
var node_xj = require("xls-to-json");
var debug = require('debug')('results');

/* GET home page. */
router.get('/', function(req, res) {
	if('uploaded_file_name' in req.session && req.session.uploaded_file_name != '') {
		debug('RESULTS::::'+req.session.uploaded_file_name);
		filename = req.session.uploaded_file_name;
		req.session.uploaded_file_name = '';
		req.session.save();
		if (filename != '') {
			convertToJSON(__dirname+'/../files/'+filename, res);
		}
	} else {
		res.redirect('/');
	}
});

var convertToJSON = function(fileurl, res) {
	/*excelParser.worksheets({
		inFile: fileurl,
	}, function(err, worksheets){
		if(err) console.error(err);
		var fileContent = {};
		var sheetsInfo = [];
		var worksheet_count = 0;
		for (x in worksheets) {
			excelParser.parse({
				inFile: fileurl,
				worksheet: worksheets[x].id,
			}, function(err, records){
				if(err) console.error(err);
				fileContent[worksheets[x].name] = records;
				sheetsInfo[worksheets[x].name] = [];
				sheetsInfo[worksheets[x].name]['rows'] = records.length;
				sheetsInfo[worksheets[x].name]['columns'] = records[0].length;
				worksheet_count++;
				if(worksheet_count == worksheets.length){
					console.log(fileContent);
					console.log(sheetsInfo);
					res.render('results', { title: 'Express', json : JSON.stringify(fileContent), sheetsinfo : sheetsInfo });	
				}
			});	
		}
	});*/
	node_xj({
	    input: fileurl, 
	    output: null
	}, function(err, result) {
	    if(err) {
	      debug('PARSER::::'+err);
	    } else {
	      debug('PARSER::::'+result);
	      res.render('results', { title: 'Express', json : JSON.stringify(result), sheetsinfo : [] });	
	    }
	});
}

module.exports = router;