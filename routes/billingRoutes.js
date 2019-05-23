const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

/*Express does not parse by default the request payload*/
/*requireLogin as a second argument to tell the route to pass that
middleware to all api/stripe routes*/
module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: 'Emaily Credits',
			source: req.body.id
		});
		//req.user is auto set by passport
		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
