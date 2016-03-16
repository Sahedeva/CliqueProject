var express = require('express');
var router = express.Router();
var User = require('../models/user'); 
var Clique = require('../models/clique');
var Track = require('../models/track');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clique' });
});

/* GET user_form */
router.get('/user_form', function(req, res, next) {
	clique = [{_id: 1, name:"SXSW"},{_id: 2, name:"I Love Hip-hop"},{_id: 3, name:"FolkFunk"}];
	console.log(clique);
  	res.render('user_form', { title: 'User Form', clique: clique });
});

/* GET clique_form */
router.get('/clique_form', function(req, res, next) {
  res.render('clique_form', { title: 'Clique Form' });
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

  	new_user.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');

  	});
  res.json(req.body);
});


module.exports = router;
