//server.js
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db.js')
const bcrypt = require('bcrypt');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);


const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  store: new pgSession({
    pool : pool,                // Connection pool
    // Use another table-name than the default "session" one
    // Insert connect-pg-simple options here
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: { maxAge: 30 * 60 * 1000 }, // 30 days
  // Insert express-session options here
  saveUninitialized:false
}));
passport.use('local', new LocalStrategy({usernameField: 'email', passwordField :'password'},( username, password, cb )=> {
  console.log("this is being executed");
  pool.query("SELECT * FROM users WHERE email = $1", [username], (err, result) => {
      if(err){
        console.log("db error");
          return cb(err);
      }
      if(result.rows.length > 0){
        const user = result.rows[0];

        // Compare the provided salted password with the stored hashed password
        bcrypt.compare(password, user.hashed_password,(err,result)=>{
          if (result) {
            console.log("successful log in with password: "+password +" "+ user.hashed_password);
              return cb(null, user); // Authentication successful
          } else {
            console.log("incorret pw");
            return cb(null, false, { message: 'Incorrect password' });
          }
        });
      }
      else {
        console.log("user not found");
        return  cb(null, false, {message: 'user not found'});
      }
  })
}));
passport.serializeUser(function(user, done){
  console.log("serialize user is executing");
  done(null, user.user_id);
})

passport.deserializeUser(function(id, done){
  console.log("deserialize user is executing");
  pool.query('SELECT * FROM users WHERE user_id = $1', [id], (err, results) => {
      if(err) {
        return done(err)
      }
      return done(null, results.rows[0])
    });
});
app.use(passport.session());

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout',logoutRouter);
app.use((err,req,res,next)=>{
  res.status(400).json({message:err});
})

module.exports = app;
