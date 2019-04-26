const passport = require('passport');

module.exports = app => {
	//Instead of an arrow function we throw an argument to tell passport
	//to try to authenticate the user using google
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);
	//At this point passport gonna see the code that google callsback
	//In the address and use it
	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		/*logout() is a function attached by passport to the request*/
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
