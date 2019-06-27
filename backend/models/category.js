var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: String,
    experiences: [{mongoose.Schema.Types.ObjectId, ref: 'Experience'}];
})

module.exports = mongoose.model('Category', categorySchema);
