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
const changeRouter = require('./routes/change');
const eventsRouter = require('./routes/events.js');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);


const app = express();
/**
 * Configuration options for CORS (Cross-Origin Resource Sharing).
 * @type {Object}
 * @property {Array<string>} origin - The allowed origins for CORS requests.
 * @property {boolean} credentials - Indicates whether CORS requests should include credentials.
 */
const corsOpt = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials:true,
}

app.use(cors(corsOpt));
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
  cookie: { maxAge: 30 * 60 * 1000}, // 30 minutes
  // Insert express-session options here
  saveUninitialized:false,

}));  
app.use(passport.authenticate('session'));


passport.use(new LocalStrategy({usernameField: 'email', passwordField :'password'},( username, password, cb )=> {
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
  done(null, {id: user.user_id}); 
})

passport.deserializeUser(function(id, done){
  console.log("deserialize user is executing");
  return done(null,id);
});



app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout',logoutRouter);
app.use('/change', changeRouter);
app.use('/events', eventsRouter);
app.use((err,req,res,next)=>{
  res.status(400).json({message:err});
})

module.exports = app;
