var mongoose = require('mongoose'), Schema = mongoose.Schema;
var experienceSchema = require('./experience.js');

var categorySchema = new mongoose.Schema({
    name: {type: String, unique: true, required: 'Category name is required'},
    experiences: ['Experience']
})

module.exports = mongoose.model('Category', categorySchema);
