var mongoose = require('mongoose');

module.exports = mongoose.model('Experience', {
    name: String,
    note: String,
    img: File,
    timestamp: true
})
