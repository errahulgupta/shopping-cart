var express     = require("express"),
    router        = express.Router(),
    Product       = require("../models/product"),
    passport      = require("passport"),
    User          = require("../models/user"),
    Cart          = require("../models/cart");


router.get("/",function(req,res){
   Product.find(function(err,docs){
       if(err){
           console.log(err);
       }else{
           var productchunks = [];
           var chunksize = 3;
           for(var i=0;i<docs.length;i+=chunksize){
               productchunks.push(docs.slice(i,i+chunksize));
           }
           res.render("shop/index",{products : productchunks}); 
       }
       
   });
});

router.get("/add-to-cart/:id",function(req,res){
    var productid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items : {}});
    
    Product.findById(productid,function(err,product){
       if(err){
           return res.redirect("/")
       } 
       cart.add(product,productid);
       req.session.cart = cart;
       console.log(req.session.cart)
       res.redirect("/");
    });
});

router.get("/reduce/:id",function(req, res) {
    var productid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items : {}});
    
    cart.reduceByOne(productid);
    req.session.cart = cart;
    res.redirect("/shopping-cart");
});

router.get("/remove/:id",function(req, res) {
    var productid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items : {}});
    
    cart.removeitem(productid);
    req.session.cart = cart;
    res.redirect("/shopping-cart");
});

router.get("/shopping-cart",function(req, res) {
    if(!req.session.cart){
        res.render("shop/shopping-cart",{products:null}) ;
    }
   var cart = new Cart(req.session.cart);
   res.render("shop/shopping-cart",{products:cart.generatearray(),totalPrice : cart.totalPrice})
});

router.get("/checkout",function(req, res) {
    if(!req.session.cart){
        res.redirect("/shopping-cart");
    }
    var cart = new Cart(req.session.cart);
   res.render("shop/checkout",{total : cart.totalPrice});
});

module.exports = router;

