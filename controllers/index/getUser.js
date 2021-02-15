const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');

module.exports = function (req, res, next) {
    let {uName} = req.query;
    
    if (uName) {
        db.findOne(Player, {uName: uName}, {uName: 1, level: 1, atk: 1, aspeed: 1, critchance: 1, critdamage: 1, weaponprof: 1, _id: 0}, function (result) {
            res.send(result);
        });
    } else if (req.session.username) {
        db.findOne(Player,
                   {uName: req.session.username},
                   {
                       _id: 0,
                       uName: 1,
                       level: 1,
                       atk: 1,
                       aspeed: 1,
                       critchance: 1,
                       critdamage: 1,
                       weaponprof: 1,
                       equippedWeapon: 1,
                       weapons: 1,
                       consumables: 1,
                       exp: 1,
                       lastlogin: 1,
                       materials: 1,
                       spoints: 1
                    },
                    function (result) {
            res.send(result);
        });
    } else {
        res.send(null);
    }
};