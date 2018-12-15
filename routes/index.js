var express = require('express');

var router = express.Router();

  //Sort descending Function  
  function sortDesc(prop) {
    return function (a, b) {
      if (a[prop] < b[prop]) {
        return 1;
      } else if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    }
  }

    //Sort ascending Function  
    function sortAsc(prop) {
      return function (a, b) {
        if (a[prop] > b[prop]) {
          return 1;
        } else if (a[prop] < b[prop]) {
          return -1;
        }
        return 0;
      }
    }


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Focus on The Family Broadcast' });
});

/* GET Broadcast archive page. */
router.get('/broadcastArchive', function (req, res) {
  let db = req.db;
  let collection = db.get('broadcastCollection');

  collection.find({}, {}, function (e, docs) {
    let sortedBroadcastData = docs.sort(sortDesc("broadcastAirDate"));
    res.render('broadcastArchive', {
      "broadcastArchive": sortedBroadcastData
    });
  });
});

/* GET Broadcast json. */
router.get('/broadcastList', function (req, res) {
  let db = req.db;
  let collection = db.get('broadcastCollection');
  collection.find({{"broadcastCollection.broadcastAirDate": {$lte: new Date().getTime()-(1*60*60*1000) }}, {}, function (e, docs) {
    let sortedBroadcastData = docs.sort(sortAsc("broadcastAirDate"));
    res.json(sortedBroadcastData);
  });
});

/* GET Edit Broadcast Page. */
router.get('/addBroadcast', function (req, res) {
  res.render('addBroadcast', { title: 'Edit Broadcast Details' });
});


/* TODO:
-Validate inputs
-do more error checking
*/
/* post Edit Broadcast Page. */
router.post('/addBroadcast', function (req, res) {
  // Set our internal DB variable
  let db = req.db;

  // Get our form values. These rely on the "name" attributes
  let broadcastTitle = req.body.broadcastTitle;
  let broadcastAirDate = req.body.broadcastAirDate;
  let broadcastGuests = req.body.Guests;
  let broadcastHosts = req.body.broadcastHosts;
  let broadcastImage = req.body.broadcastImage;
  let audioFile = req.body.audioFile;


  // Set the collection
  let collection = db.get('broadcastCollection');

  // Submit to the DB

  collection.insert({
    'broadcastTitle': broadcastTitle,
    'broadcastImage': broadcastImage,
    'broadcastAirDate': broadcastAirDate,
    'broadcastGuests': broadcastGuests,
    'broadcastHosts': broadcastHosts,
    'audioFile': audioFile,

  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send('There was a problem adding the information to the database.');
    } else {
      // And forward to success page
      res.redirect('/broadcasts');
    }
  });
});

module.exports = router;
