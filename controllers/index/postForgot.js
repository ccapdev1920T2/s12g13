const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');
const Forgot = require('../../models/ForgotModel.js');

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

function getForgotString () {
    let forgotstring = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let alphabetLength = alphabet.length;

    for (let i = 0; i < 80; i++) {
        forgotstring += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
    }

    return forgotstring;
}

function getPassword () {
    let password = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?!.,;:-_=+()@#$%^&*';
    let alphabetLength = alphabet.length;

    for (let i = 0; i < 12; i++) {
        password += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
    }

    return password;
}

module.exports = function (req, res, next) {
    let {username} = req.body;

    if (!username) {
        res.render('index', {
            error: 'Missing fields'
        });
    } else {
        db.findOne(Player, {uName: username}, null, async function (result) {
            if (result) {
                let forgotstring = getForgotString();
                let password = getPassword()
                let newHashedPassword = await bcrypt.hash(password, 10);

                db.insertOne(Forgot, {
                    uName: result.uName,
                    forgotstring: forgotstring,
                    newpw: newHashedPassword
                }, function(blah) {});

                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: process.env.MAILUSER,
                      pass: process.env.MAILPASS
                    }
                });
                
                let details = {
                    from: 'CCTAPDEV Team<CCTAPDEV@gmail.com>', // sender address
                    to: result.email, // list of receivers
                    subject: 'Password Reset', // Subject line
                    html: `Hey ${result.uName}, 
                           Your new password is <b>${password}</b>
                           To set this as your password go <a href="${process.env.ROOT}/forgot/${forgotstring}">here</a>.
                           Ignore this if you did not reset your password` // html body
                };
                
                transporter.sendMail(details, function (err, info) {
                    if (err) {
                        console.log(err);
                        error = err;
                    }
                });

                res.render('confirmation', {
                    "header": "Email Sent!",
                    "message": "Please check your email for further instructions!"
                });
            } else {
                res.render('index', {
                    error: 'Username does not exist'
                });
            }
        });
    }
};