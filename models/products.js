const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        tags: [
            {
                type: String,
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Products', productSchema);
