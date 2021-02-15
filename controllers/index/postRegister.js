const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');
const Confirm = require('../../models/ConfirmModel.js');

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function getConfirmationString () {
    let confirmstring = '';
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let alphabetLength = alphabet.length;

    for (let i = 0; i < 60; i++) {
        confirmstring += alphabet.charAt(Math.floor(Math.random() * alphabetLength));
    }

    return confirmstring;
}

module.exports = function (req, res, next) {
    let {email, username, password, cpassword} = req.body;

    if (!email || !username || !password || !cpassword) {
        res.render('index', {
            error: 'Missing fields',
            regemail: email,
            reguser: username
        });
    } else if (password !== cpassword) {
        res.render('index', {
            error: 'Passwords do not match',
            regemail: email,
            reguser: username
        });
    } else if (!emailTest.test(email)) {
        res.render('index', {
            error: 'Invalid email',
            regemail: email,
            reguser: username
        });
    } else {
        db.findOne(Player, {uName: username}, null, async function (result) {
            if (!result || result.length == 0) {
                hashedPassword = await bcrypt.hash(password, 10);

                db.insertOne(Player, {
                    uName: username,
                    pw: hashedPassword,
                    email: email
                }, function ({uName}) {
                    let confirmstring = getConfirmationString();

                    db.insertOne(Confirm, {
                        uName: uName,
                        confirmstring: confirmstring
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
                        to: email, // list of receivers
                        subject: 'Email Confirmation', // Subject line
                        html: `Hey ${username}, 
                               Welcome to CCTAPDEV!
                               Please confirm your email address <a href="${process.env.ROOT}/confirm/${confirmstring}">here</a>.` // html body
                    };
                    
                    transporter.sendMail(details, function (err, info) {
                        if (err) {
                            console.log(err);
                            error = err;
                        }
                    });

                    res.render('confirmation', {
                        "header": "Successfully Registered!",
                        "message": "A confirmation email has been sent to your email address!"
                    });
                });
            } else {
                res.render('index', {
                    error: 'Username already exists',
                    regemail: email,
                    reguser: username
                });
            }
        });
    }
};