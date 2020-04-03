// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `weapons`
var WeaponSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
   
    type: {
        type: String,
        enum: ['R','P','S'],
        required: true
    },
    damage: {
        type: Number,
        min: 0,
        default: 1
    }
   


});


module.exports = mongoose.model('Weapon', WeaponSchema);