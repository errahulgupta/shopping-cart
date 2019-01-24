var express = require("express");
var router = express.Router();
var Product       = require("../models/product"),
    passport      = require("passport"),
    User          = require("../models/user"),
    middleware = require("../middleware/index"); 
    
    
router.get("/signup",function(req,res,next){
   res.render("user/signup"); 
});

router.post("/signup",function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            res.redirect("/");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success","Welcome to Yelpcamp " + user.username);
           res.redirect("/user/profile"); 
        });
    });
});

router.get("/profile",middleware.isLoggedIn,function(req, res, next) {
   res.render("user/profile"); 
});

router.get("/signin",function(req, res, next) {
    res.render("user/signin");
});

router.post("/signin",passport.authenticate("local",
    {
     successRedirect : "/user/profile",
     failureRedirect : "/user/signin",
   }
),function(req,res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","logged you out");
   res.redirect("/");
});

module.exports = router;