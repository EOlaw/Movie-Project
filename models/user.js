const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Creating a userSchema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be blank']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be blank']
    }
})

//Validating the userSchema
userSchema.statics.findAndValidate = async (username, password) => {
    const foundUser = await this.findOne( { username })
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

userSchema.pre('save', async (next) => {
    if (!this.isModified('password')) return next ();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

//Exporting user models to database
module.exports = mongoose.model('User', userSchema);