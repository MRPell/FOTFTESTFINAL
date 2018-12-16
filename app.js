let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');

// Run Db with cmd Prompt or powershell: D:\MongoDb\mongodb-win32-x86_64-2008plus-ssl-4.0.3\bin\mongod.exe  --dbpath C:\Users\mrpel\WebAppProjects\fotfBroadcastApp\data
let mongo = require('mongodb');
let monk = require('monk');
let db = monk('localhost:27017/fotfBroadcastApp');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.locals.moment = require('moment');



//TODO: Set up cloud database
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://MRPell:<Password>@genesiscluster-mwmsw.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const db = client.db("fotfBroadcastApp").collection("broadcastList");
//  // perform actions on the collection object
//   client.close();
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
