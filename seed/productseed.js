var mongoose = require("mongoose");
var Product = require("../models/product");

mongoose.connect('mongodb://localhost:27017/shopcart', { useNewUrlParser: true });

var products = [
    new Product({
        title: "gothic video game",
        price : 10,
        image: "https://picsum.photos/200/300",
        description: "awesome vieo game  !!!!!!" 
    }),
    new Product({
        title: "mario video game",
        price : 20,
        image: "https://picsum.photos/300/300",
        description: "brilliant vieo game  !!!!!!" 
    }),
    new Product({
        title: "GTA video game",
        price : 30,
        image: "https://picsum.photos/300/200",
        description: "Best ever vieo game  !!!!!!" 
    }),
];

var done=0;
for(var i=0;i<products.length;i++){
    products[i].save(function(err,result){
        done++;
        if(done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
