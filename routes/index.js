let express = require('express');

let router = express.Router();

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
router.get('/broadcast/archive', function (req, res) {
  let db = req.db;
  let collection = db.get('broadcastCollection');
  let dbQuery = { "broadcastAirDate": { $lte: new Date((new Date().getTime())) } };
  collection.find(dbQuery, {}, function (e, docs) {
    let sortedBroadcastData = docs.sort(sortDesc("broadcastAirDate"));
    res.render('broadcastArchive', {
      "broadcastArchive": sortedBroadcastData
    });
  });
});

/* GET Broadcast json. */
router.get('/broadcast/recent', function (req, res) {
  let db = req.db;
  let collection = db.get('broadcastCollection');
  let daysOfHistory = 7;
  let dbQuery = { "broadcastAirDate": { $gte: new Date((new Date().getTime() - (daysOfHistory * 24 * 60 * 60 * 1000))), $lte: new Date((new Date().getTime())) } };
  collection.find(dbQuery, {}, function (e, docs) {
    let sortedBroadcastData = docs.sort(sortDesc("broadcastAirDate"));
    res.json(sortedBroadcastData);
  });
});


// /* GET Edit Broadcast Page. */
// router.get('/broadcast/add', function (req, res) {
//   res.render('addBroadcast', { title: 'Add Broadcast' });
// });


/* TODO:
-Validate inputs
-do more error checking
*/
/* post Edit Broadcast Page. */
// router.post('/broadcast/add', function (req, res) {
//   // Set our internal DB letiable
//   let db = req.db;

//   // Get our form values. These rely on the "name" attributes
//   let broadcastTitle = req.body.broadcastTitle;
//   let broadcastAirDate = req.body.broadcastAirDate;
//   let broadcastGuests = req.body.Guests;
//   let broadcastHosts = req.body.broadcastHosts;
//   let broadcastImage = req.body.broadcastImage;
//   let audioFile = req.body.audioFile;


//   // Set the collection
//   let collection = db.get('broadcastCollection');

//   // Submit to the DB

//   collection.insert({
//     'broadcastTitle': broadcastTitle,
//     'broadcastImage': broadcastImage,
//     'broadcastAirDate': broadcastAirDate,
//     'broadcastGuests': broadcastGuests,
//     'broadcastHosts': broadcastHosts,
//     'audioFile': audioFile,

//   }, function (err, doc) {
//     if (err) {
//       // If it failed, return error
//       res.send('There was a problem adding the information to the database.');
//     } else {
//       // And forward to success page
//       res.redirect('/');
//     }
//   });
// });

module.exports = router;
