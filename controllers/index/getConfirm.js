const createError = require('http-errors');

const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');
const Confirm = require('../../models/ConfirmModel.js');

module.exports = function (req, res, next) {
    let {id} = req.params;

    db.findOne(Confirm, {confirmstring: id}, null, function (result) {
        if (!result || result.length == 0 || result.verified == true) {
            next(createError(404));
        } else {
            db.updateOne(Player, {uName: result.uName}, {verified: true});
            db.deleteOne(Confirm, {confirmstring: id});
            res.render('confirmation', {
                "header": "Successfully Confirmed!",
                "message": "You can now log in!"
            });
        }
    });
};