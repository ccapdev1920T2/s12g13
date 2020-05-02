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

    type: {
        type: String,
        enum: ['Rock','Paper','Scissor'],
        required: true
    },

    expdrop:{
        type: Number,
        min: 1
    },

    src:{
        type: String
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