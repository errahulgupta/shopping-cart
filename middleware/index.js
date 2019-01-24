var middlewareobj = {};

middlewareobj.isLoggedIn = function(req,res,next){
     if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","you need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareobj;