// import db and schema modules
const db = require('../models/db.js');
const Player = require('../models/PlayerModel.js');
const Enemy = require('../models/EnemyModel.js');
const Inventory = require('../models/InventoryModel.js');
const Weapon = require('../models/WeaponModel.js');
const Consumable = require('../models/ConsumableModel.js');



const controller = {
    getIndex: function (req, res, next) {
        res.render('index');
    },
    postRegister: function (req, res, next) {
        res.render('confirmation', {
            "header": "Successfully Registered!",
            "message": "A confirmation email has been sent to your email address!"
        });
    },
    postForgot: function (req, res, next) {
        res.render('confirmation', {
            "header": "Email Sent!",
            "message": "A recovery email has been sent to your email address!"
        });
    },
    postLogin: function (req, res, next) {
        res.redirect('/main');
    },
    getMain: function (req, res, next) {
        res.render('main');
    },

    getUser: function (req, res){
        let uName = req.query.uName;
        db.findOne(Player, {uName: uName}, {}, function (result) {
            res.send(result);
        })
    },

    getLeaders: function (req, res){
        db.findMany(Player,{},{},{sort:{level:-1}, limit: 10}, function(result) {
            res.send(result);
        })
    },

    getMonsters: function(req, res){
        db.findMany(Enemy,{},{},{},function(result){
            res.send(result);
        })
    }

};

module.exports = controller;