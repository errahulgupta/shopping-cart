var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var productSchema = new mongoose.Schema({
   title: String,
   price : Number,
   image: String,
   description: String
});

productSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Product", productSchema);