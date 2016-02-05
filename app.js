var  express = require('express'),
 	mongoose = require('mongoose'),
		 app = express(),
 		  db = mongoose.connection;

mongoose.connect('mongodb://192.168.1.66/test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Yay! Mongo!')
});


app.listen(4000, function(){
	console.log('listening on port 4000')
});