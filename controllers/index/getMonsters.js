const db = require('../../models/db.js');
const Enemy = require('../../models/EnemyModel.js');

module.exports = function (req, res, next) {
    db.findMany(Enemy, {}, {},function (result) {
        res.send(result);
    });
};