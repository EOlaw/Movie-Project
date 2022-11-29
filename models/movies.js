const mongoose = require('mongoose');
const Joi = require('joi');

const movieSchema = new mongoose.Schema ({
    Title: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: String,
        Death: String
    },
    ImagePath: String,
    Actors: [String],
    ReleaseYear: String,
    Featured: String
});

module.exports = mongoose.model('Movies', movieSchema);