const createError = require('http-errors');

const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');
const Forgot = require('../../models/ForgotModel.js');

module.exports = function (req, res, next) {
    let {id} = req.params;

    db.findOne(Forgot, {forgotstring: id}, null, function (result) {
        if (!result || result.length == 0 || result.verified == true) {
            next(createError(404));
        } else {
            db.updateOne(Player, {uName: result.uName}, {pw: result.newpw});
            db.deleteOne(Forgot, {forgotstring: id});
            res.render('confirmation', {
                "header": "Password Reset!",
                "message": "You can now log in!"
            });
        }
    });
};