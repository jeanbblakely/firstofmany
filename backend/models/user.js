var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: 'email is required' },
  password: {type:String, required: 'password is required' },
  salt: String,
  username: {type: String, unique: true, required: 'username is required' },
  name: String,
  birthdate: Date,
  gender: String,
  tracked_categories: { type: [mongoose.Schema.Types.ObjectId], ref: 'Category'},
  favorites: Array
})

module.exports = mongoose.model('User', userSchema)
