// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `players`
var PlayerSchema = new mongoose.Schema({
    uName: {
        type: String,
        required: true,
        unique: true
    },
   
    pw: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    level:{
        type: Number,
        min: 1,
        default: 1
    },
    exp: {
        type: Number,
        min: 0,
        default: 0
    },
    atk: {
        type: Number,
        min: 1,
        default: 1
    },
    aspeed: {
        type: Number,
        min: 1,
        default: 1
    },
    critdamage: {
        type: Number,
        min: 1.2,
        default: 1.2
    },
    critchance: {
        type: Number,
        min: 0.1,
        default: 0.1
    },
    equippedWeapon: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Weapon'
    },
    
    weapons: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Weapon'
    }],

    consumables: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Consumable'
    }]

});


module.exports = mongoose.model('Player', PlayerSchema);