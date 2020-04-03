// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `inventory`
var InventorySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player',
        required: true
    },
   
    
    weapons: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Weapon'
    }],

    consumables: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Consumable'
    }],



});


module.exports = mongoose.model('Inventory', InventorySchema);