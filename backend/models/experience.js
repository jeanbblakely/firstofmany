var mongoose = require('mongoose');

var experienceSchema = new mongoose.Schema({
    name: String,
    note: String
})


module.exports = mongoose.model('Experience', experienceSchema);
