var mongoose = require('mongoose'), Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var categorySchema = require('./category.js');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: 'email is required' },
  password: {type:String, required: 'password is required' },
  username: {type: String, unique: true, required: 'username is required' },
  name: String,
  birthdate: Date,
  gender: String,
  tracked_categories: ['Category'],
  favorites: Array,
  active: {type: Boolean, required: true, default: false},
  temporarytoken: {type: String, required: true}
})

userSchema.pre('save', function(next){
  var user = this

  if(!user.isModified('password'))
    return next()

    bcrypt.hash(user.password, null, null, (err, hash)=> {
      if(err) return next(err)

      user.password = hash
      next()
    })
})

module.exports = mongoose.model('User', userSchema)


//[{ type: Schema.Types.ObjectId, ref: 'Category' }]
