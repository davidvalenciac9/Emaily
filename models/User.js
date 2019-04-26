const mongoose = require('mongoose');

/* We can use destructuring because const Schema = mongoose.Schema; */
const { Schema } = mongoose;

const userSchema = new Schema({
	googleId: String
});

/*We are creating a new collection, the first argument
is the name of the collection, the secong is the
Schema we want to use on that collection*/
mongoose.model('users', userSchema);
