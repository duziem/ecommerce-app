const mongoose= require('mongoose');

const CartSchema= new mongoose.Schema({
    _productId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'no product id provided'],
    }
})

const Cart= mongoose.model('Cart', CartSchema);

module.exports= { Cart };