const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
//const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/user');
const users = require('./controllers/users')

//Calling out the routes files
const userRoutes = require('./routes/users')



//Connection to Mongoose
const mongoose = require('mongoose');
//const { reset } = require('nodemon');
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/Movies-Project?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



//Set the view engine to ejs
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));


//configure app
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'notagoodsecret' })) //use for user authentication
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(__dirname + 'public/img')) //to load images

//app.use(session(sessionConfig))

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.use(new passportLocal(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//Blocking pages without authentication
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}



app.use('/', userRoutes)

app.get('/majidahs', isLoggedIn, (req, res) => {
    res.render('majidahs')
})
app.get('/', (req, res) => {
    res.render('majidahs/index')
})
app.get('/home', isLoggedIn, (req, res) => {
    res.render('majidahs/home')
})
app.get('/movies', isLoggedIn, (req, res) => {
    res.render('majidahs/movies')
})
app.get('/tv-shows', isLoggedIn, (req, res) => {
    res.render('majidahs/tv-shows')
})
app.get('/new-and-popular', isLoggedIn, (req, res) => {
    res.render('majidahs/new-and-popular')
})
app.get('/account-setting', isLoggedIn, (req, res) => {
    res.render('majidahs/account-setting')
})







app.listen(3000, () => {
    console.log("Listening on port: localhost:3000")
})