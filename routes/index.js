var express = require('express');
var router = express.Router();
var User = require('../models/user'); 
var Clique = require('../models/clique');
var Track = require('../models/track');
var mongoose = require('mongoose');

// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACf3f47245558bab8ef0ad24f5f4c464d0';
var authToken = "f5e95817975c0d7d9635ca0e14058113";
var client = require('twilio')(accountSid, authToken);

//require the Twilio module and create a REST client 
 
// client.messages.create({ 
//     to: "+15047290928", 
//     from: "+15045562763", 
//     body: "Hey Jenny! Good luck on the bar exam!", 
//     mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
// }, function(err, message) { 
//     console.log(message.sid); 
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clique' });
});
/* Show all cliques */
router.get('/showCliques', function(req, res, next){
	 Clique.find({}, function(err, cliques){
	 	res.json(cliques);
	 });
});

/* GET user_form */
router.get('/user_form', function(req, res, next) {
	Clique.find({}, function(err, clique){
  	res.render('user_form', { title: 'User Form', clique: clique });
  });
});

/* Show one user */
router.post('/showOneUser', function(req, res, next){
	res.json(req);
});

/* GET clique_form */
router.get('/clique_form', function(req, res, next) {
  res.render('clique_form', { title: 'Clique Form' });
});

/* GET track_form */
router.get('/track_form', function(req, res, next) {
  res.render('track_form', { title: 'Track Form' });
});

/* POST user_form */
router.post('/new_user', function(req,res,next){
	console.log(req.body);
	var name = req.body.name;
	var phone = req.body.phone
	var privilege = req.body.access_drop;
	var avatar_url = req.body.avatar_url;
	var cliques = req.body.cliques;
	var new_user = new User({
    	name: name, 
    	phone: phone, 
    	privilege: privilege,
    	avatar_url: avatar_url,
    	cliques: cliques
  	});

  	new_user.save(function(err, user) {
    if (err) throw err;

    console.log('User saved successfully');
    console.log(user['_id']);
    for (i=0;i<cliques.length;i++){
    	Clique.findOne({'_id': cliques[i]}, function(err, clique) {
    		console.log(clique)
      	var user_array = clique.user_array;
      	user_array.push(user['_id']);
      	clique.user_array = user_array;
      	clique.save(function(err) {
            if (err) {

            }
        });
      });
    }
  	});
  res.json(req.body);
});

/* POST clique_form */
router.post('/new_clique', function(req,res,next){
	console.log(req.body);
	var name = req.body.name;
	var genre = req.body.genre_drop;
	var avatar_url = req.body.avatar_url;
	var new_clique = new Clique({
    	name: name, 
    	genre: genre, 
    	avatar_url: avatar_url,
  	});

  	new_clique.save(function(err) {
    if (err) throw err;

    console.log('Clique saved successfully');

  	});
  res.json(req.body);
});

/* POST track_form */
router.post('/new_track', function(req,res,next){
	console.log(req.body);
	var song_title = req.body.song_title;
	var content_url = req.body.content_url;
	var avatar_url = req.body.avatar_url;
	var artist_name = req.body.artist_name;
	var artist_id = req.body.artist_id;
	var new_track = new Track({
    	song_title: song_title, 
    	content_url: content_url, 
    	avatar_url: avatar_url,
    	artist_name: artist_name,
    	artist_id: artist_id
  	}); 

  	new_track.save(function(err) {
	    if (err) throw err;
	    console.log('Track saved successfully');
	    Clique.find({}, function(err, cliques){
	    	var cliques_length = cliques.length;
	    	var addArray = [];
	    	var cliqueObj = cliques;
				while (addArray.length < 5) {
				    var rand_num = Math.floor(Math.random()*10);
					var same = false;
					for (i=0;i<addArray.length;i++) {
					    if (rand_num==addArray[i]) {
					        same = true;
					    }
					}
					if(same==false){
					    addArray.push(rand_num);
					}
				}
				console.log(addArray);
				for (i=0;i<5;i++){
					var counter = i;
					var track_array = cliques[addArray[i]]['track_array'];
					track_array.push(content_url);
					for (j=0;j<cliques[addArray[i]]['user_array'].length;j++){
						User.findOne({'_id': cliques[addArray[i]]['user_array'][j]}, function(err, users) {
							console.log(users);
							var phone = "+1"+users.phone;
							var name = users.name;
							client.messages.create({ 
							    to: phone, 
							    from: "+15045562763", 
							    body: "Hey "+name+"! "+cliqueObj[addArray[counter]]['name']+" got a track added!", 
							    mediaUrl: cliqueObj[addArray[counter]]['avatar_url'],  
							}, function(err, message) { 
							    console.log(message.sid); 
							});

						});
					}
					Clique.findOneAndUpdate({'_id': cliques[addArray[i]]['_id']}, {track_array: track_array}, {new: true}, function(err, clique) {
          	console.log("Updated Clique: " + clique);
          	if (err) {
            	console.log('got an error');
          	}
        	});
				}
	  	});
  	});
  res.json(req.body);
});

module.exports = router;
