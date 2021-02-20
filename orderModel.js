// orderModel.js
var mongoose = require('mongoose');
// Setup schema
var orderSchema = mongoose.Schema({
    _id:  Number,
    petId: Number,
    shipDate: Date,
    stage: {
        type: String,
        enum: ['placed', 'approved', 'delivered']
    },
});
// Export Order model
var Order = module.exports = mongoose.model('order', orderSchema);
module.exports.get = function (callback, limit) {
    Order.find(callback).limit(limit);
}