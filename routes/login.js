const express = require('express')
const router = express.Router();

//Routing login
router.get('/', (req, res) => {
    res.render('login')
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

//Handling user logout
router.post('/logout', (req, res) => {
    req.session.user_id = null;
    //req.logout();
    // req.session.destroy();
    res.redirect('/login');
})


//Exporting the route
module.exports = router;