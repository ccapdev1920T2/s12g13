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
        min: 0
    },

    type: {
        type: String,
        enum: ['R','P','S'],
        required: true
    },

    expdrop:{
        type: Number,
        min: 1
    },
    
    weapondrops: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Weapon'
    }],

    consumabledrops: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Consumable'
    }],



});


module.exports = mongoose.model('Enemy', EnemySchema);