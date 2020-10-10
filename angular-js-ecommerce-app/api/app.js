const express = require('express');
const app = express();

require('./db/mongoose');

const bodyParser = require('body-parser');

// Load in the mongoose models
const { Product, Cart, Wishlist } = require('./db/models');

const jwt = require('jsonwebtoken');

const async= require('async');

/* MIDDLEWARE  */

// Load middleware
app.use(bodyParser.json());


// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});


/***Code for querying the product collection */
/*Get the entire products stored in the database*/
app.get('/products', (req, res)=>{
    Product.find().
    then((products)=>{
        res.send(products);
    }).
    catch((e)=>{res.send(e)})
})

app.get('/products/:productId', (req, res)=>{
    Product.findOne({
        _id: req.params.productId
    }).then((product)=>{
        res.send(product);
    }).catch((e)=>{res.send(e)})
})

app.patch('/products/:productId', (req, res)=>{
    Product.findOneAndUpdate({
        _id: req.params.productId
    }, {
        $set: req.body
    }).then((product)=>{
        res.send("product collection updated successfully");
    }).catch((e)=>{res.send(e + " - Failed to update product collection")})
})

app.post('/products', (req, res)=>{
    
    let productMeta= [
    {brand: 'Samsung', name: 'Samsung Galaxy 10', price:152.00, imageurl:'../../../assets/images/products/1.png', date:Date.now()},
    {brand: 'Redmi', name: 'Redmi Note 7', price: 122.00, imageurl: '../../../assets/images/products/2.png', date: Date.now()},
    {brand: 'Redmi', name: 'Redmi Note 6', price: 122.00, imageurl: '../../../assets/images/products/3.png', date: Date.now()},
    {brand: 'Redmi', name: 'Redmi Note 5', price: 122.00, imageurl: '../../../assets/images/products/4.png', date: Date.now()},
    {brand: 'Samsung',name:  'Samsung Galaxy S6', price: 152.00, imageurl: '../../../assets/images/products/11.png', date: Date.now()},
    {brand: 'Samsung',name:  'Samsung Galaxy S7', price: 152.00, imageurl: '../../../assets/images/products/12.png', date: Date.now()},
    {brand: 'Apple', name: 'Apple iPhone 5', price: 152.00, imageurl: '../../../assets/images/products/13.png', date: Date.now()},
    {brand: 'Apple', name: 'Apple iPhone 6', price: 152.00, imageurl: '../../../assets/images/products/14.png', date: Date.now()}
    ]
        for(product of productMeta){
            newProduct= new Product({
                item_brand: product.brand, item_name: product.name, item_price: product.price, item_image: product.imageurl, item_register: product.date, item_rating: 0
            })
            //console.log(newProduct);
            //let products= await newProduct.save();
            //res.send(products);
            
            newProduct.save().then((listDoc) => {
                res.send(listDoc);
            }).catch(()=>{res.send('could not post products')})
            
        }
    
})

//delete from cart
app.delete('/products/:productId', (req, res)=>{
    Product.findByIdAndRemove({
        _id: req.params.productId
    }).then(()=>{
        res.send('deleted');
    })
})

/***Code for querying the product collection */

/**Code for querying the cart collection */

//get data by user id

//get cart items
app.get('/cart', (req, res)=>{
    Cart.find().then((cart)=>{
        res.send(cart);
    }).catch((e)=>res.send(e))
})

//insert into cart
app.post('/cart', (req, res)=>{
    let newCart= new Cart({
        _productId: req.body.productId
    })
    newCart.save().then((cart)=>{
        res.send(cart);
    }).catch((e)=> {res.send(e)})
})

//delete from cart
app.delete('/cart/:cartId', (req, res)=>{
    Cart.findByIdAndRemove({
        _id: req.params.cartId
    }).then((cart)=>{
        res.send(cart)
    })
})
/**Code for querying the cart collection */


/**Code for querying the wishlist collection */

//get wishlist items
app.get('/wishlist', (req, res)=>{
    Wishlist.find().then((cart)=>{
        res.send(cart);
    }).catch((e)=>res.send(e))
})

//insert into wishlist
app.post('/wishlist', (req, res)=>{
    let newWishlist= new Wishlist({
        _productId: req.body.productId
    })
    newWishlist.save().then((wishlist)=>{
        res.send(wishlist);
    }).catch((e)=> {res.send(e)})
})

//delete from wishlist
app.delete('/wishlist/:wishlistId', (req, res)=>{
    Wishlist.findByIdAndRemove({
        _id: req.params.wishlistId
    }).then((wishlist)=>{
        res.send(wishlist)
    })
})

/**Code for querying the wishlist collection */

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})

/*
async function populate(){
    let productMeta= [{brand: 'Samsung', name: 'Samsung Galaxy 10', price:152.00, imageurl:'src/assets/images/products/1.png', date:Date.now()},
{brand: 'Redmi', name: 'Redmi Note 7', price: 122.00, imageurl: 'src/assets/images/products/2.png', date: Date.now()},
{brand: 'Redmi', name: 'Redmi Note 6', price: 122.00, imageurl: 'src/assets/images/products/3.png', date: Date.now()},
{brand: 'Redmi', name: 'Redmi Note 5', price: 122.00, imageurl: 'src/assets/images/products/4.png', date: Date.now()},
{brand: 'Samsung',name:  'Samsung Galaxy S6', price: 152.00, imageurl: 'src/assets/images/products/11.png', date: Date.now()},
{brand: 'Samsung',name:  'Samsung Galaxy S7', price: 152.00, imageurl: 'src/assets/images/products/12.png', date: Date.now()},
{brand: 'Apple', name: 'Apple iPhone 5', price: 152.00, imageurl: 'src/assets/images/products/13.png', date: Date.now()},
{brand: 'Apple', name: 'Apple iPhone 6', price: 152.00, imageurl: 'src/assets/images/products/14.png', date: Date.now()}
]
    for(product of productMeta){
        newProduct= await new Product({
            item_brand: product.brand, item_name: product.name, item_price: product.price, item_image: product.imageurl, item_register: product.date
        })
        console.log(newProduct);
        
        newProduct.save().then((listDoc) => {
            console.log(listDoc);
        })
    }

}

populate();
*/