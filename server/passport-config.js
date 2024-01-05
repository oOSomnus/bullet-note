const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./db'); // Import your database connection

passport.use(new LocalStrategy({
    usernameField: 'email', // Assuming email is used as the username
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Manually apply the stored salt to the provided password
            const saltedPassword = `${password}${user.salt}`;

            // Compare the provided salted password with the stored hashed password
            const isMatch = await bcrypt.compare(saltedPassword, user.hashed_password);

            if (isMatch) {
                return done(null, user); // Authentication successful
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        } else {
            return done(null, false, { message: 'User not found' });
        }
    } catch (error) {
        return done(error);
    }
}));

// Serialize user to the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            done(null, user);
        } else {
            done(new Error('User not found'));
        }
    } catch (error) {
        done(error);
    }
});

module.exports = passport;
