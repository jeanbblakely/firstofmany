var mongoose = require('mongoose'), Schema = mongoose.Schema;
var categorySchema = require('./category.js');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: 'email is required' },
  password: {type:String, required: 'password is required' },
  salt: String,
  username: {type: String, unique: true, required: 'username is required' },
  name: String,
  birthdate: Date,
  gender: String,
  tracked_categories: [categorySchema['Category'], {_id : false }],
  favorites: Array
})

module.exports = mongoose.model('User', userSchema)


//[{ type: Schema.Types.ObjectId, ref: 'Category' }]
