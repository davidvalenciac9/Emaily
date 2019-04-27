//KEYS.JS PRODUCTION
if (process.env.NODE_ENV === 'production') {
	//we are in production
	module.exports = require('./prod');
} else {
	//we are in dev - return dev keys
	module.exports = require('./dev');
}

////S6NccsvBPxEqSgV2 password mongoDb prod

////45479743782-77qcbnock03028lpjvrim2l6nppjdu51.apps.googleusercontent.com -- GOOGLE CLIENT ID PROD
////JxESL2NPiPI_476niyIw92mH -- GOOGLE PROD SECRET
