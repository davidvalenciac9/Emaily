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
	//At this point passport gonna see the code that google callback
	//In the address and use it
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(req, res) => {
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		/*logout() is a function attached by passport to the request*/
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		console.log(req.user);
		res.send(req.user);
	});
};
