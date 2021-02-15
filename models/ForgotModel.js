// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `players`
var ForgotSchema = new mongoose.Schema({
    uName: {
        type: String,
        required: true,
        unique: true,
        ref: 'Player',
    },
    forgotstring: {
        type: String,
        required: true,
        unique: true
    },
    newpw: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Forgot', ForgotSchema);