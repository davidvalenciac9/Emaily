const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

/*Doing mongoose.model with 1 argument means we want to fetch something
out of mongoose. 2 arguments means we want to create the model in mongoose*/
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	/*user.id refers to the mongoDB id*/
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id) /*This returns a promise*/
		.then(user => {
			done(null, user);
		});
});

//passport.use telling passport that we will use google strategy
//This create a new instance of google strategy
passport.use(
	//GoogleStrategy has an internal identifier as 'google'
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			//This callbackURL has to match the Authorized redirect URI
			//In Google API credentials
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		/*This argument (arrow function) is the oportunity to
		take user information*/
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({
				googleId: profile.id
			});
			/*User.findOne returns a promise were the argument of the .then
			will return the user. If not user found return null*/
			if (existingUser) {
				//Already have a record with that Profile ID
				console.log('User Already exists');
				return done(null, existingUser);
			}
			//We don't have a record with that ID, make new MODEL INSTANCE!!!
			const user = await new User({
				googleId: profile.id
			}).save(); /*.save() will add the user to the mongoDB*/
			/*This create a new MODEL INSTANCE for the same user and is the one we use*/
			done(null, user);
		}
	)
);
