// petModel.js
var mongoose = require('mongoose');
// Setup schema
var petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id:  Number,
    category: String,
    tags: [String],
    status: {
        type: String,
        enum: ['available', 'sold']
    },
});
// Export Contact model
var Pet = module.exports = mongoose.model('pet', petSchema);
module.exports.get = function (callback, limit) {
    Pet.find(callback).limit(limit);
}