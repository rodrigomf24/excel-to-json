var express		= require('express');
var morgan 		= require('morgan');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
var app			= express();


app.use(express.static(__dirname + '/public')); // Set the static files location /public/img will be /img for users
app.use(morgan('dev')); 		//log every request to the console
app.use(bodyParser());			//pull information from html in POST
app.use(methodOverride());		//simulate DELETE and PUT

app.listen(8080);
console.log('MAginc happens on port 8080');
