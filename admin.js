const https = require('https');
const fs = require('fs');
/*
const options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};
*/
const bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');

const express = require('express');
const path = require('path');
const session = require('express-session');

var indexRouter = require('./routes/index');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

const app = express();

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/', indexRouter);

app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())


require("dotenv").config();

app.listen(process.env.APPLICATION_PORT, function() {
  console.log('Server started on port ' + process.env.APPLICATION_PORT);
});