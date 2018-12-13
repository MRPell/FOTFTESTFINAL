var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello World page **DELETE**. */
router.get('/helloworld', function(req, res, next) {
  res.render('helloWorldDel', { title: 'Hello World' });
});

/* GET Broadcast list page. */
router.get('/broadcasts', function(req, res) {
  var db = req.db;
  var collection = db.get('broadcastCollection');
  collection.find({},{},function(e,docs){
      res.render('broadcastList', {
          "broadcastList" : docs
      });
  });
});

module.exports = router;
