var express			= require("express");
var path 			= require('path');
var app 			= express();
var bodyParser		= require('body-parser');
var mongoose        = require('mongoose');
var methodOverride  = require('method-override');
var _               =require('lodash');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));



//CORS support    (middleware. helps access APIs, urls. hepls load stuff from different domains)
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


app.use('/hello', function(req, res, next){
	res.send('Hey there!');
	next();
});
//load models
app.models = require('./models/index.js');
//load the routes
var routes = require('./routes');
_.each(routes, function(controller, route){
	app.use(route, controller(app, route));
});


mongoose.connect('mongodb://localhost:27017/meanapp');
mongoose.connection.once('open', function(){
	console.log('The server is listening on port 8000');
	app.listen(8000);
});


// app.listen(8000, function() {
// 	console.log('The server is listening on port 8000');
// });



