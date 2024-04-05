const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const strategies = require('./config/passport');
const multer = require('multer');
const session = require('express-session');

dotenv.config();

// nodemailer = require ('nodemailer');
//const { google }   = require ('googleapis');
//const OAuth2  = google.auth.OAuth2 ; 
const mongoose = require('./config/dbConnect');

mongoose.connect();

// index routes
const indexRouter = require('./routes/index');
const { googleStrategy } = require('./config/socials');

const app = express();

// Connect to mongodb

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
	resave: true,
	saveUninitialized: true,
  }));
  
app.use('/coreApi/v1', indexRouter);

app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use("google",googleStrategy);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
 	 console.log(err);
	// render the error page
	res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;




