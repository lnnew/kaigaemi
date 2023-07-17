var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet());

var flash = require('connect-flash');
const { Client } = require("pg");
// var conString = "postgres://arzktxswwbrmhd:570ee5e6b8fe0640c46cf2735695998d5c7f1c17bc6af0709cf5d3b0695fcd18@ec2-34-231-63-30.compute-1.amazonaws.com:5432/d72ae1dpu44igv";
// var client = new Client(conString);
// const client = new Client({
//    user: "arzktxswwbrmhd",
//    host: "ec2-34-231-63-30.compute-1.amazonaws.com",
//   database: "d72ae1dpu44igv",
//   password: "570ee5e6b8fe0640c46cf2735695998d5c7f1c17bc6af0709cf5d3b0695fcd18",
//      port: 5432,
//  });
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
 database: "nodedb",
 password: "0329",
    port: 5432,
    
});
 app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(compression());

var session = require('express-session')
//var FileStore = require('session-file-store')(session)
const {Firestore} = require('@google-cloud/firestore');
const {FirestoreStore} = require('@google-cloud/connect-firestore');

app.use(
  session({
    store: new FirestoreStore({
      dataset: new Firestore(),
      kind: 'express-sessions',
    }),
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
  })
);

// app.use(session({
//   secret: 'asadlfkj!@#!@#dfgasdg',
//   resave: false,
//   saveUninitialized: true,
//   store: new FileStore()
// }))


app.use(flash());

var passport = require('./lib/passport')(app);

app.get('*', function (request, response, next) {
  fs.readdir('./data', function (error, filelist) {
    request.list = filelist;
    next();
  });
});

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});
