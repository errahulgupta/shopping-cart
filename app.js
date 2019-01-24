var express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    favicon     = require("serve-favicon"),
    logger      = require("morgan"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    path        =require("path"),
    User        = require("./models/user"),
    cookieParser= require("cookie-parser"),
    session= require("express-session"),
    LocalStrategy = require("passport-local"),
    MongoStore    = require("connect-mongo")(session);
    
var routes = require("./routes/index");
var userroutes = require("./routes/user");

mongoose.connect('mongodb://localhost:27017/shopcart', { useNewUrlParser: true });


app.set("views",path.join(__dirname,"views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "GTA is best game",
    resave: false,
    saveUninitialized: false,
    store : new MongoStore({mongooseConnection : mongoose.connection}),
    cookie : {maxAge : 600*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname + "/public")));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.login = req.isAuthenticated();
   res.locals.session = req.session;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use("/",routes);
app.use("/user",userroutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The shopping cart Server Has Started!");
});