const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    collection: 'category'
});

module.exports = mongoose.model("Category", categorySchema);