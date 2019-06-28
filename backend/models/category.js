var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: String,
    experiences: Array
})

module.exports = mongoose.model('Category', categorySchema);
