var mongoose = require('mongoose'), Schema = mongoose.Schema;
var experienceSchema = require('./experience.js');

var categorySchema = new mongoose.Schema({
    name: String,
    experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }] 
})

module.exports = mongoose.model('Category', categorySchema);
