const db = require('../../models/db.js');
const Weapon = require('../../models/WeaponModel.js');

module.exports = function (req, res, next) {
    db.findMany(Weapon, {}, {},function (result) {
        res.send(result);
    });
};