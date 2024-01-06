//passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./db'); // Import your database connection

passport.use(new LocalStrategy((email, password, done) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if(err){
            return done(err)
        }
        if (result.rows.length === 0) {
            return done(null,false, {message: "Incorrect email or password."})
        }
        user = result.rows[0];
        // Manually apply the stored salt to the provided password
        const saltedPassword = `${password}${user.salt}`;

        // Compare the provided salted password with the stored hashed password
        const isMatch = bcrypt.compare(saltedPassword, user.hashed_password);

        if (isMatch) {
            return done(null, user); // Authentication successful
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }) 
    }));


// Serialize user to the session
passport.serializeUser((user, done) => {
    process.nextTick(()=>{
        done(null, {id:user.id});
    })
});

// Deserialize user from the session
passport.deserializeUser((user,done)=>{
    process.nextTick(()=>{
        return done(null,user);
    })
})

module.exports = passport;
