var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: String,
    password: String,
    username: String,
    name: String,
    birthdate: Date,
    gender: String,
    tracked_categories: [],
    favorites: []
})
