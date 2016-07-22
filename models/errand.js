var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var errandSchema = new Schema({
    title: String,
    description: String,
    completedBy: Date,
    categories: Array
});

module.exports = mongoose.model('Errand', errandSchema);