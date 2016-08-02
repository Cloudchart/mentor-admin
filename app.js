require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var routes = require('./routes/index').default;
var bots = require('./routes/bots').default;
var surveys = require('./routes/surveys').default;
var questions = require('./routes/questions').default;
var scenarios = require('./routes/scenarios').default;
var actions = require('./routes/actions').default;
var courses = require('./routes/courses').default;
var cards = require('./routes/cards').default;
var blocks = require('./routes/blocks').default;
var bot_owners = require('./routes/bot_owners').default;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  store: new RedisStore({ url: process.env.REDIS_URL }),
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  name: 'mentor-admin',
  resave: true,
  saveUninitialized: true
}));

// routes
app.use('/', routes);
app.use('/', questions);
app.use('/', cards);
app.use('/', actions);
app.use('/bots', bots);
app.use('/bot_owners', bot_owners);
app.use('/courses', courses);
app.use('/surveys', surveys);
app.use('/scenarios', scenarios);
app.use('/cards/:cardId/blocks', blocks);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
