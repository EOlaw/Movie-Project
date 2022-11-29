const express = require('express');
const app = express();
const path = require('path');


//APP.GET
app.get('/', (req, res) => {
    res.send('I love coding')
})


//Serving Up
app.listen(3000, () => {
    console.log("Serving up on localhost:3000")
})