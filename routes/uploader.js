/*
 * @author: Rodrigo Morales
 * @project: virtuemart
 * @year: 2014
 * @version: 0.1
 */
 
var express = require('express');
var router = express.Router();
var fs = require('fs');
var util = require('util');
var formidable = require('formidable');
var debug = require('debug')('parser');

router.post('/', function(req, res) {
 	var form = new formidable.IncomingForm(),
 		files = [],
 		fields = [];
 	form.uploadDir = __dirname + "/../files/";
 	form.keepExtensions = true;
    form.on('file', function(field, file){
    	console.log(field, file);
    	debug('Express server listening on port 8080');
        files.push([field, file]);
    }).on('fileBegin', function(name, file){
    	//rename the incoming file to the file's name
    	file.path = form.uploadDir + file.name;
    	req.session.uploaded_file_name = file.name;
    	req.session.save();
    }).on('end', function(){
    	debug('UPLOADER::::upload done');
    	res.redirect('/results');
    });
    form.parse(req);

    return;
});

module.exports = router;