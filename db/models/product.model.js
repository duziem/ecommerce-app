const mongoose= require('mongoose');

const ProductSchema= new mongoose.Schema({
    item_brand: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    item_name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    item_price: {
        type: Number,
        required: true,
    },
    item_image: {
        type: String,
        trim: true
    },
    item_register: {
        type: Date,
        required: true,
        Default: Date.now()
    },
    item_rating: {
        type: Number,
        Default: 0
    }
})

const Product= mongoose.model('Product', ProductSchema);

module.exports= { Product };