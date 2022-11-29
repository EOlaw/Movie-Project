const express = require('express');
const app = express();
const path = require('path');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');
const ejsMate = require('ejs-mate');
const movies = require('./models/movies');
const loginRoutes = require('./routes/login')


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

//Configure the app
app.use(express.urlencoded({ extended: true })); //use for user authentication
app.use(session({ secret: 'notagoodsecret' })) //use for user authentication
app.use(express.static('public'))
app.use('/img', express.static(__dirname + 'public/img')) //to load images


//requireLogin
const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

//APP.USE
app.use('/login', loginRoutes)


//APP.GET
app.get('/', (req, res) => {
    res.send('I love coding')
})


//Serving Up
app.listen(3000, () => {
    console.log("Serving up on localhost:3000")
})