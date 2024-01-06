//server.js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
require('dotenv').config();

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy({passReqToCallBack: true, usernameField: 'email', passwordField :'password'},( username, password, cb )=> {
  console.log("this is being executed");
  pool.query("SELECT * FROM users WHERE email = $1", [username], (err, result) => {
      if(err){
          return cb(err);

      }
      if(result.rows.length > 0){
        user = result.rows[0];
        // Manually apply the stored salt to the provided password
        const saltedPassword = '${password}${user.salt}';

        // Compare the provided salted password with the stored hashed password
        const isMatch = bcrypt.compare(saltedPassword, user.hashed_password);

        if (isMatch) {
            return done(null, user); // Authentication successful
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
      }
      else {
          cb(null, false);
      }
  })
}));

passport.serializeUser(function(user, done){
  console.log("serialize user is executing")
  done(null, user.id);
})

passport.deserializeUser(function(id, done){
  pool.query('SELECT * FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
      if(err) {
        return done(err)
      }

      done(null, results.rows[0])
    });
});

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.use((err,req,res,next)=>{
  res.json({error:err});
})

module.exports = app;
