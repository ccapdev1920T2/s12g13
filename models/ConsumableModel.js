// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `consumables`
var ConsumableSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
   
    effect: {
        type: String,
        enum: ['Adamage', 'Aspeed', 'Cchance','Cdamage'],
        required: true
    },
    value: {
        type: Number,
        default: 2
    }
   


});


module.exports = mongoose.model('Consumable', ConsumableSchema);