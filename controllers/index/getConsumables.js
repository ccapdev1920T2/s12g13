const db = require('../../models/db.js');
const Consumable = require('../../models/ConsumableModel.js');

module.exports = function (req, res, next) {
    db.findMany(Consumable, {}, {},function (result) {
        res.send(result);
    });
};