var mongoose = require('mongoose');

var experienceSchema = new mongoose.Schema({
    name: String,
    note: String,
    img: String,
    datestamp: Date,
    favorite: Boolean,

})


module.exports = mongoose.model('Experience', experienceSchema);
