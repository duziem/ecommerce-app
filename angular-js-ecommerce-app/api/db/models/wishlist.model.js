const mongoose= require('mongoose');

const WishlistSchema= new mongoose.Schema({
    _productId: {
        type: mongoose.Types.ObjectId,
        required: [true, 'no product id provided'],
    }
})

const Wishlist= mongoose.model('Wishlist', WishlistSchema);

module.exports= { Wishlist };