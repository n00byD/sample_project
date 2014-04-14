

// server.js

	

	// set up ========================
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb

	// configuration =================

	mongoose.connect('mongodb://n00byD:n00byD@novus.modulusmongo.net:27017/zY9vojur'); 	// connect to mongoDB database on modulus.io

	app.configure(function() {
		app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
		app.use(express.logger('dev')); 						// log every request to the console
		app.use(express.bodyParser()); 							// pull information from html in POST
		app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});


	//define model ================	
	var Movies = mongoose.model('Movies',{// mongoDB will automatically generate an id for each movie entered
		text : String
	});


	//routes
		//api+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		


		//get all movies
		app.get('/api/movies', function(req, res){

				//use mongoose to get all the movies in the database
				Movies.find(function(err, movies){

				// if there is an error retrieving then this will send the error
				if (err)
					res.send(err)

				res.json(movies);						
				});
		});

		//create a movie then send back all movies after the creation
		app.post('/api/movies', function(req, res){
			// create a movie, this information will come from an AJAX request from Angular
			Movies.create({
				text : req.body.text,
				done : false
			}, function(err, movies){
				if (err)
					res.send(err);


				//get and return all movies after you create another
				Movies.find(function(err, movies){
					if (err)
						res.send(err)
					res.json(movies);
				});
			});
		});


		//delete a movie
		app.delete('/api/movies/:movies_id', function(req, res){
			Movies.remove({
				_id : req.params.movies_id
			}, function(err, movies){
				if(err)
					res.send(err);

				//get and return all movies after you delete one
				Movies.find(function(err, movies){
					if(err)
						res.send(err)
					res.json(movies);
				});
			});
		});


	//application ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	app.get('*', function(req,res){
		res.sendfile('./public/index.html');//this will load a single view file, then the rest wiull be handled by angu
	});


	// listen (start app with node server.js) ======================================
	app.listen(8080);
	console.log("App listening on port 8080");



