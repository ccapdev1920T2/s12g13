const db = require('../../models/db.js');
const Player = require('../../models/PlayerModel.js');
const Confirm = require('../../models/ConfirmModel.js');

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { updateOne } = require('../../models/PlayerModel.js');
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
    let username = req.session.username;
    let {newuser, newpass, cnewpass, newemail, password} = req.body;

    if (!password && !newemail && !cnewpass && !newpass && !newuser) {
        res.send('Missing fields');
    } else if (newpass && cnewpass && newpass !== cnewpass) {
        res.send('Passwords do not match');
    } else if (newemail && !emailTest.test(newemail)) {
        res.send('Invalid email');
    } else {
        db.findOne(Player, {uName: username}, {pw: 1, _id: 0}, function (result) {
            if (result) {
                bcrypt.compare(password, result.pw, async (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    }
    
                    if (isMatch) {
                        if (newuser) {
                            db.findOne(Player, {uName: newuser}, null, function (result) {
                                if (!result || result.length == 0) {
                                    db.updateOne(Player, {uName: username}, {uName: newuser});
                                    username = newuser;
                                } else {
                                    res.send('New username is taken');
                                    return;
                                }
                            });
                        }
                
                        if (newemail) {
                            let confirmstring = getConfirmationString();
                    
                            db.updateOne(Player, {uName: username}, {email: newemail, verified: false});
                
                            db.insertOne(Confirm, {
                                uName: username,
                                confirmstring: confirmstring
                            }, function (blah) {});
                
                            let transporter = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    user: process.env.MAILUSER,
                                    pass: process.env.MAILPASS
                                }
                            });
                            
                            let details = {
                                from: 'CCTAPDEV Team<CCTAPDEV@gmail.com>', // sender address
                                to: newemail, // list of receivers
                                subject: 'New Email Confirmation', // Subject line
                                html: `Hey ${username}, Please confirm your new email address <a href="${process.env.ROOT}/confirm/${confirmstring}">here</a>.` // html body
                            };
                            
                            transporter.sendMail(details, function (err, info) {
                                if (err) {
                                    console.log(err);
                                    error = err;
                                }
                            });
                        }
                
                        if (newpass) {
                            let hashedpassword = await bcrypt.hash(newpass, 10);
                
                            db.updateOne(Player, {uName: username}, {pw: hashedpassword});
                        }
                
                        req.session.loggedin = false;
                        req.session.username = null;
                        res.send('Please refresh the page to continue.')
                    } else {
                        res.send('Invalid credentials');
                    }
                })
            } else {
                req.session.loggedin = false;
                req.session.username = null;
                res.send('User not found. Please refresh the page.');
            }
        });
    } 
};