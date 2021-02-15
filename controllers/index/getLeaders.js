const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');

const numLeaders = 10;

module.exports = function (req, res, next) {
    db.findMany(Player, {}, {uName: 1, level: 1, _id: 0}, function (result) {
        if (result) {
            result.sort(function (a, b) {
                return a.level < b.level;
            });
            result.splice(numLeaders, result.length - numLeaders);
            res.send(result);
        } else {
            res.send(null);
        }
    });
};