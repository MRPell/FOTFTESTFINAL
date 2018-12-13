var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET Broadcast list page. */
router.get('/broadcasts', function (req, res) {
  var db = req.db;
  var collection = db.get('broadcastCollection');
  collection.find({}, {}, function (e, docs) {
    res.render('broadcastList', {
      "broadcastList": docs
    });
  });
});

/* GET Edit Broadcast Page. */
router.get('/addBroadcast', function (req, res) {
  res.render('addBroadcast', { title: 'Edit Broadcast Details' });
});

/* post Edit Broadcast Page. */
router.post('/addBroadcast', function (req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var broadcastTitle = req.body.broadcastTitle;
  var broadcastAirDate = req.body.broadcastAirDate;
  var broadcastGuests = req.body.Guests;
  var broadcastHosts = req.body.broadcastHosts;
  var broadcastImage = req.body.broadcastImage;
  var audioFile = req.body.audioFile;


  // Set our collection
  var collection = db.get('broadcastCollection');

  // Submit to the DB

  collection.insert({
    "broadcastTitle": broadcastTitle,
    "broadcastImage": broadcastImage,
    "broadcastAirDate": broadcastAirDate,
    "broadcastGuests": broadcastGuests,
    "broadcastHosts": broadcastHosts,
    "audioFile": audioFile

  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect('/broadcasts');
    }
  });

});

module.exports = router;
