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
        enum: ['Rock','Paper','Scissors'],
        required: true
    },
    damage: {
        type: Number,
        min: 0,
        default: 10,
        required: true
    },
    rarity: {
        type: String,
        enum: ['Common', 'Uncommon', 'Rare', 'Epic'],
        required: true
    },
    sheetid: {
        type: String,
        default: null
    }
});


module.exports = mongoose.model('Weapon', WeaponSchema);