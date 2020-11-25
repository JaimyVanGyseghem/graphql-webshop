const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    images: {
        type: Array
    },
    categories: {
        type: Array
    },
    date: {
        type: Date
    },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'product'
});

module.exports = mongoose.model("product", productSchema);