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
    level: {
        type: Number,
        min: 1,
        default: 1
    },
    spoints: {
        type: Number,
        min: 0,
        default: 0
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
    weaponprof: {
        type: Number,
        min: 1,
        default: 1
    },
    equippedWeapon: {
        type: String,
        ref: 'Weapon',
        default: null
    },
    weapons: [{
        type: String, 
        ref: 'Weapon',
        default: null
    }],
    consumables: [{
        type: String, 
        ref: 'Consumable',
        default: null
    }],
    verified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    },
    materials: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model('Player', PlayerSchema);