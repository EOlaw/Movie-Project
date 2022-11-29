const express = require('express');
const router = express.Router();

//Showing Registration Form
app.get('/register', (req, res) => {
    res.render('register')
})
//Handling User Registration
app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const user = new User({ username, password })
    await user.save();
    req.session.user_id = user._id;
    res.redirect('/login')
})

module.exports = router;