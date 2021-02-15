const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');

module.exports = function (req, res, next) {
    let {level, atk, aspeed, critchance, critdamage, equippedWeapon, exp, materials, spoints, weaponprof} = req.body;
    let weapons = req.body['weapons[]'];
    let consumables = req.body['consumables[]'];

    if (weapons && typeof(weapons) === 'string') {
        weapons = [weapons]
    }

    if (consumables && typeof(consumables) === 'string') {
        consumables = [consumables]
    }

    db.findOne(Player, {uName: req.session.username}, {lastLogin: 1, _id: 0}, function (result) {
        let materialBonus = 0;
        let newDate = new Date();
        console.log(newDate.toISOString());

        if (result.lastLogin) {
            materialBonus = Math.floor(Math.abs(newDate - result.lastLogin) / 3600000);
            console.log(materialBonus);
        }

        db.updateOne(Player, {uName: req.session.username}, {
            level: level,
            atk: atk,
            aspeed: aspeed,
            critchance: critchance,
            critdamage: critdamage,
            equippedWeapon: equippedWeapon,
            weapons: weapons,
            consumables: consumables,
            exp: exp,
            materials: parseInt(materials) + parseInt(materialBonus),
            spoints: spoints,
            weaponprof: weaponprof,
            lastLogin: newDate
        });
    })

    res.send('saved');
};