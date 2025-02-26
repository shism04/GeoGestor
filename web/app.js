var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var session = require('express-session');

var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to save uploaded images
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique filename
  }
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: '776655431234', // Replace with your secret key
  resave: false,              // Forces the session to be saved back to the session store, even if the session was never modified
  saveUninitialized: true,    // Forces a session that is new but not modified to be saved to the store
  cookie: {
      maxAge: 1000 * 60 * 60, // Set cookie expiration time (e.g., 1 hour)
      secure: false,           // Set to true if using HTTPS
      httpOnly: true           // Helps to prevent cross-site scripting attacks
  }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, 'node_modules/leaflet/dist')));


app.use('/', indexRouter);

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
