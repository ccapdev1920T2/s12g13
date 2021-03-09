// DEPENDENCIES
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require("express-session");

require('dotenv').config();

// ROUTES
const indexRouter = require('./routes/index');

// ADD DATA
const db = require('./models/db.js');
const addData = require('./models/DummyData.js');
db.connect();
addData();

const app = express();

const PORT = process.env.PORT || 3000;

console.log(`Started listening at port ${PORT}`);
app.listen(PORT);

// VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs.create({
  extname: 'hbs',
  defaultLayout: 'main',          // sets the main .hbs file
  partialsDir: 'views/partials',  // sets the partial directory
  layoutsDir: 'views/layouts',    // sets the layouts directory
}).engine);

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRETKEY,
  resave: true,
  saveUninitialized: true
}));

// ROUTES MIDDLEWARE
app.use('/', indexRouter);

// CATCH 404
app.use(function(req, res, next) {
  next(createError(404));
});

// ERROR HANDLER
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
