// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `enemies`
var EnemySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    hp: {
        type: Number,
        default: 50
    },
    hplvl: {
        type: Number,
        default: 50
    },
    type: {
        type: String,
        enum: ['Rock','Paper','Scissors'],
        required: true
    },
    expdrop:{
        type: Number,
        min: 1,
        default: 100
    },
    src:{
        type: String
    },  
    weapondrops: [{
        type: String, 
        ref: 'Weapon'
    }],
    consumabledrops: [{
        type: String, 
        ref: 'Consumable'
    }],
});


module.exports = mongoose.model('Enemy', EnemySchema);