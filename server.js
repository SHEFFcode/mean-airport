var PORT = process.env.PORT || 7000;
var express = require('express');
var express_geocoding_api = require('express-geocoding-api');
var bodyParcer = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Airport = require('./models/airport.js');
var State = require('./models/state.js');

//mongoose connection
mongoose.connect('mongodb://sheff:123@ds019658.mlab.com:19658/airfind');
var db = mongoose.connection;

//middleware
app.use(express.static(__dirname + '/client'));
app.use(bodyParcer.json());
app.use(express_geocoding_api({
	geocoder: {
		provider: 'google'
	}
}));

//paths
app.get('/api', function(req, res) {
	res.send('Please use /api/airports or /api/states endpoints');
});
app.get('/api/airports', function(req, res) {
	Airport.getAirports(function(err, docs) {
		if (err) {
			res.send(err);
		} else {
			res.json(docs);
		}
	});
});
app.get('/api/states', function(req, res) {
	State.getStates(function(err, docs) {
		if (err) {
			res.send(err);
		} else {
			res.json(docs);
		}
	});
});
app.get('/api/airports/state/:state', function(req, res) {
	Airport.getAirportByState(req.params.state, function(err, docs) {
		if (err) {
			res.send(err);
		} else {
			res.json(docs);
		}
	});
});
app.post('/api/airports/prox', function(req, res) {
	var location = req.body;
	Airport.getAirportsByProximity(location, function(err, docs) {
		if (err) {
			res.send(err);
		} else {
			res.json(docs);
		}
	});
});

app.listen(PORT);
console.log('App is running on port...' + PORT);