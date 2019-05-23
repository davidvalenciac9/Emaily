const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
//We can just use require because we are not assigning it to anything on server.js
require('./models/User.js');
require('./services/passport.js');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const app = express();

/*The Following use function, are in charge of the middleware (cookieSession & passport)
the come before the route handlers if we want every request to pass by the middleware objects*/

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000 /*30 days in ms*/,
		keys: [
			keys.cookieKey
		] /*we can put more keys on the array for add security it will take one random*/
	})
);
app.use(passport.initialize());
app.use(passport.session());

/*We are passing the express() ass a parameter to the authRoutes function
	we don't need to assign the require to a varibale because we can
	call the function and the parameter directly from the require*/
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//configuration for express to behave correctly in production

if (process.env.NODE_ENV === 'production') {
	//Express will serve up production assests
	//like main.js our main.css files
	app.use(express.static('client/build'));

	//Express will serve up the index.html file
	//If it doesn't recognize the file
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server Runing');
});
