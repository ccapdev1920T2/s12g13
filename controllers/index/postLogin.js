const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');

const bcrypt = require('bcrypt');

module.exports = function (req, res, next) {
    let {username, password} = req.body;

    if (!username || !password) {
        res.render('index', {
            error: 'Missing fields',
            loguser: username
        });
    } else {
        db.findOne(Player, {uName: username}, {pw: 1, verified: 1}, function (result) {
            if (result) {
                bcrypt.compare(password, result.pw, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    }

                    if (!isMatch) {
                        res.render('index', {
                            error: 'Invalid credentials',
                            loguser: username
                        });
                    } else {
                        if (result.verified) {
                            req.session.loggedin = true;
                            req.session.username = username;
                            res.redirect('/main');
                        } else {
                            res.render('index', {
                                error: 'Account not verified',
                                loguser: username
                            });
                        }
                    }
                });
            } else {
                res.render('index', {
                    error: 'Invalid credentials',
                    loguser: username
                });
            }
        });
    }
};