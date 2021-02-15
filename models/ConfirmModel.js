// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `players`
var ConfirmSchema = new mongoose.Schema({
    uName: {
        type: String,
        required: true,
        unique: true,
        ref: 'Player',
    },
    confirmstring: {
        type: String,
        required: true,
        unique: true
    }
});


module.exports = mongoose.model('Confirmation', ConfirmSchema);