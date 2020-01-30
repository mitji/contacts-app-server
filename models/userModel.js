const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create userschema
const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

// create model
const User = mongoose.model('User', userSchema);

// export model
module.exports = User;

