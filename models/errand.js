var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var errandSchema = new Schema({
    title: { type: String, unique: true, required: true },
    slug : { type: String, unique: true, required: true },
    description: { type: String, required: true  },
    completedBy: { type: Date, required: true },
    categories: { type: Array }
});

module.exports = mongoose.model('Errand', errandSchema);