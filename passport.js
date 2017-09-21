const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: JWT_SECRET
}, async (payload, done) => {
	try {
		// Find the user specified in token
		const user = await User.findById(payload.sub);

		// If user doesn't exist, handle it :)
		if (!user){
			return done(null, false);
		}
		// Otherwise, return user
		done(null, user);

	} catch (error){
		done(error, false);
	}
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
	usernameField: 'email'
}, async (email, password, done) => {
	try {
		// Find user by email ( or password !);
		const user = await User.findOne({$or: [{email},{username: email}]});
		// If not, handle it
		if (!user){
			return done(null, false);
		}
		// Check if the password is correct
		const isMatch = await user.isValidPassword(password);
		if (!isMatch){
			return done(null, false);
		}
		return done(null, user);
	} catch (error){
		return done(error, false);
	}

}));
