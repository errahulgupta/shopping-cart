var passport    = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    User        = require("../models/user");
    
passport.serializeUser(function(user,done){
    done(null,user.id);
});
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
       done(err,user); 
    });
});

passport.use("local.signup",new LocalStrategy({
    usernameField : "username",
    passwordField : "password",
    passReqToCallback : true
},function(req, username , password, done){
    User.findOne({username:"username"},function(err,user){
       if(err){
           return done(err);
       } 
       if(user){
           return done(null,false,{message : "email is already in use"});
       }
       var newUser =  new User();
       newUser.username = username;
       newUser.password = newUser.encryptPassword(password);
       newUser.save(function(err,result){
          if(err){
              return done(err);
          } 
          return done(null,newUser);
       });
    });
    
}));

passport.use("local.signin",new LocalStrategy({
    usernameField : "username",
    passwordField : "password",
    passReqToCallback : true
},function(req, username , password, done){
    User.findOne({username:"username"},function(err,user){
       if(err){
           return done(err);
       } 
       if(!user){
           return done(null,false,{message : "No user found"});
       }
       if(!user.validPassword(password)){
           return done(null,false,{message : "wrong password"});
       }
       return done(null,user);
    });
    
}));