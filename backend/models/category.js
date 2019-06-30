var mongoose = require('mongoose'), Schema = mongoose.Schema;
var experienceSchema = require('./experience.js');

var categorySchema = new mongoose.Schema({
    name: String,
    experiences: ['Experience', {_id : false}]
})

module.exports = mongoose.model('Category', categorySchema);

//[{ type: Schema.Types.ObjectId, ref: 'Experience' }]
