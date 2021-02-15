const db = require('./db.js');

const Enemy = require('./EnemyModel.js');
const Player = require('./PlayerModel.js');
const Consumable = require('./ConsumableModel.js');
const Weapon = require('./WeaponModel.js');

let data = {
    monsters: [
        {
            name: "Jeremiah Finklehorn",
            type: "Paper",
            src: "/images/monsters/jeremiah.png",
            hp: 50,
            hplvl: 25,
            expdrop: 12,
            weapondrops: ["Shovel", "Sword"],
            consumabledrops: ["Ultra Potion of Damage"],
        },
        {
            name: "Jamal Finklehorn",
            type: "Scissors",
            src: "/images/monsters/jamal.png",
            hp: 70,
            hplvl: 30,
            expdrop: 15,
            weapondrops: ["The BBC"],
            consumabledrops: ["Potion of Speed"],
        },
        {
            name: "Jeremy Finklehorn",
            type: "Scissors",
            src: "/images/monsters/jeremy.png",
            hp: 30,
            hplvl: 15,
            expdrop: 9,
            weapondrops: ["Fly Swatter", "Newspaper", "Board"],
            consumabledrops: ["Potion of Speed", "Super Potion of Speed", "Mega Potion of Speed", "Ultra Potion of Speed"],
        },
        {
            name: "J3r3-m4h Finklehorn",
            type: "Rock",
            src: "/images/monsters/j3r3-m4h.png",
            hp: 100,
            hplvl: 50,
            expdrop: 20,
            weapondrops: ["Sword", "Dagger", "Box Cutter", "Ice Pick"],
            consumabledrops: ["Potion of Luck", "Super Potion of Luck", "Mega Potion of Luck", "Ultra Potion of Luck"],
        },
        {
            name: "Cement Ngo",
            type: "Rock",
            src: "/images/monsters/cement.png",
            hp: 70,
            hplvl: 35,
            expdrop: 15,
            weapondrops: ["Mace", "Slingshot", "Pellet Gun"],
            consumabledrops: ["Potion of Brutality", "Super Potion of Brutality", "Mega Potion of Brutality", "Ultra Potion of Brutality"],
        },
        {
            name: "Lament Ngo",
            type: "Paper",
            src: "/images/monsters/lament.png",
            hp: 40,
            hplvl: 20,
            expdrop: 10,
            weapondrops: ["J's Scripture"],
            consumabledrops: ["Potion of Damage", "Super Potion of Damage", "Mega Potion of Damage", "Ultra Potion of Damage"],
        },
        {
            name: "Chuck Dynasty",
            type: "Rock",
            src: "/images/monsters/chuck_dynasty.png",
            hp: 40,
            hplvl: 20,
            expdrop: 10,
            weapondrops: ["Stick"],
            consumabledrops: ["Potion of Damage"],
        },
        {
            name: "Gibson Googleburts",
            type: "Rock",
            src: "/images/monsters/gibson.png",
            hp: 80,
            hplvl: 25,
            expdrop: 13,
            weapondrops: ["The BBC", "Cash Gun", "Laser Sword"],
            consumabledrops: ["Ultra Potion of Damage", "Ultra Potion of Luck", "Ultra Potion of Speed", "Ultra Potion of Brutality"],
        },
        {
            name: "John Campbell",
            type: "Rock",
            src: "/images/monsters/john.png",
            hp: 80,
            hplvl: 30,
            expdrop: 14,
            weapondrops: ["Scissors", "Fly Swatter"],
            consumabledrops: ["Potion of Damage"],
        },
        {
            name: "Mr. Oui",
            type: "Paper",
            src: "/images/monsters/mr_oui.gif",
            hp: 40,
            hplvl: 25,
            expdrop: 11,
            weapondrops: ["Club", "Mace", "Slingshot"],
            consumabledrops: ["Potion of Damage", "Super Potion of Damage", "Mega Potion of Damage", "Ultra Potion of Damage"],
        },
        {
            name: "Sad Joey",
            type: "Scissors",
            src: "/images/monsters/sad_joey.png",
            hp: 20,
            hplvl: 35,
            expdrop: 12,
            weapondrops: ["Stick"],
            consumabledrops: ["Potion of Damage"],
        },
        {
            name: "Tom",
            type: "Paper",
            src: "/images/monsters/tom.png",
            hp: 30,
            hplvl: 25,
            expdrop: 11,
            weapondrops: ["Ice Pick", "Board", "Slingshot"],
            consumabledrops: ["Potion of Damage", "Super Potion of Damage", "Mega Potion of Damage", "Ultra Potion of Damage"],
        }
    ],

    users: [
        {
            uName: "adecam",
            pw: "$2b$10$rkH78YjC7hMAuXjZgmJlAOMeKBuBgaEV8q5AH2A8x.r2NFQQS6bl.",
            verified: true,
            email: "adecam@cam.cam"
        },
        {
            uName: "alukard",
            pw: "$2b$10$rkH78YjC7hMAuXjZgmJlAOMeKBuBgaEV8q5AH2A8x.r2NFQQS6bl.",
            verified: true,
            email: "alukard@cam.cam"
        },
        {
            uName: "axlcl",
            pw: "$2b$10$rkH78YjC7hMAuXjZgmJlAOMeKBuBgaEV8q5AH2A8x.r2NFQQS6bl.",
            verified: true,
            email: "axlcl@cam.cam"
        },
        {
            uName: "olivan",
            pw: "$2b$10$rkH78YjC7hMAuXjZgmJlAOMeKBuBgaEV8q5AH2A8x.r2NFQQS6bl.",
            verified: true,
            email: "olivan@cam.cam"
        }
    ],

    weapons: [
        {
            name: "Shovel",
            type: "Rock",
            damage: 10,
            rarity: "Common",
            sheetid: "rock0"
        },
        {
            name: "Club",
            type: "Rock",
            damage: 10,
            rarity: "Common",
            sheetid: "rock1"
        },
        {
            name: "Mace",
            type: "Rock",
            damage: 20,
            rarity: "Uncommon",
            sheetid: "rock2"
        },
        {
            name: "Slingshot",
            type: "Rock",
            damage: 20,
            rarity: "Uncommon",
            sheetid: "rock3"
        },
        {
            name: "The Doris",
            type: "Rock",
            damage: 30,
            rarity: "Rare",
            sheetid: "rock4"
        },
        {
            name: "The BBC",
            type: "Rock",
            damage: 30,
            rarity: "Rare",
            sheetid: "rock5"
        },
        {
            name: "Eternal Fist of Fury",
            type: "Rock",
            damage: 40,
            rarity: "Epic",
            sheetid: "rock6"
        },
        {
            name: "Dwayne",
            type: "Rock",
            damage: 40,
            rarity: "Epic",
            sheetid: "rock7"
        },
        {
            name: "Stick",
            type: "Paper",
            damage: 10,
            rarity: "Common",
            sheetid: "paper0"
        },
        {
            name: "Fly Swatter",
            type: "Paper",
            damage: 10,
            rarity: "Common",
            sheetid: "paper1"
        },
        {
            name: "Newspaper",
            type: "Paper",
            damage: 20,
            rarity: "Uncommon",
            sheetid: "paper2"
        },
        {
            name: "Board",
            type: "Paper",
            damage: 20,
            rarity: "Uncommon",
            sheetid: "paper3"
        },
        {
            name: "J's Scripture",
            type: "Paper",
            damage: 30,
            rarity: "Rare",
            sheetid: "paper4"
        },
        {
            name: "Cash Gun",
            type: "Paper",
            damage: 30,
            rarity: "Rare",
            sheetid: "paper5"
        },
        {
            name: "Palm of the Open Mind",
            type: "Paper",
            damage: 40,
            rarity: "Epic",
            sheetid: "paper6"
        },
        {
            name: "Boy",
            type: "Paper",
            damage: 40,
            rarity: "Epic",
            sheetid: "paper7"
        },
        {
            name: "Sword",
            type: "Scissors",
            damage: 10,
            rarity: "Common",
            sheetid: "scissors0"
        },
        {
            name: "Dagger",
            type: "Scissors",
            damage: 10,
            rarity: "Common",
            sheetid: "scissors1"
        },
        {
            name: "Box Cutter",
            type: "Scissors",
            damage: 20,
            rarity: "Uncommon",
            sheetid: "scissors2"
        },
        {
            name: "Thumbtack",
            type: "Scissors",
            damage: 20,
            rarity: "Uncommon",
            sheetid: "scissors3"
        },
        {
            name: "Scissors",
            type: "Scissors",
            damage: 30,
            rarity: "Rare",
            sheetid: "scissors4"
        },
        {
            name: "Shuriken",
            type: "Scissors",
            damage: 30,
            rarity: "Rare",
            sheetid: "scissors5"
        },
        {
            name: "Symbol of Everlasting Peace",
            type: "Scissors",
            damage: 40,
            rarity: "Epic",
            sheetid: "scissors6"
        },
        {
            name: "Edward",
            type: "Scissors",
            damage: 40,
            rarity: "Epic",
            sheetid: "scissors7"
        },
    ],

    consumables: [
        {
            name: "Potion of Damage",
            effect: "Adamage",
            value: 2,
            sheetid: "damage0"
        },
        {
            name: "Super Potion of Damage",
            effect: "Adamage",
            value: 3,
            sheetid: "damage1"
        },
        {
            name: "Mega Potion of Damage",
            effect: "Adamage",
            value: 4,
            sheetid: "damage2"
        },
        {
            name: "Ultra Potion of Damage",
            effect: "Adamage",
            value: 5,
            sheetid: "damage3"
        },
        {
            name: "Potion of Brutality",
            effect: "Cdamage",
            value: 2,
            sheetid: "brutality0"
        },
        {
            name: "Super Potion of Brutality",
            effect: "Cdamage",
            value: 3,
            sheetid: "brutality1"
        },
        {
            name: "Mega Potion of Brutality",
            effect: "Cdamage",
            value: 4,
            sheetid: "brutality2"
        },
        {
            name: "Ultra Potion of Brutality",
            effect: "Cdamage",
            value: 5,
            sheetid: "brutality3"
        },
        {
            name: "Potion of Luck",
            effect: "Cchance",
            value: 2,
            sheetid: "luck0"
        },
        {
            name: "Super Potion of Luck",
            effect: "Cchance",
            value: 3,
            sheetid: "luck1"
        },
        {
            name: "Mega Potion of Luck",
            effect: "Cchance",
            value: 4,
            sheetid: "luck2"
        },
        {
            name: "Ultra Potion of Luck",
            effect: "Cchance",
            value: 5,
            sheetid: "luck3"
        },
        {
            name: "Potion of Speed",
            effect: "Aspeed",
            value: 2,
            sheetid: "speed0"
        },
        {
            name: "Super Potion of Speed",
            effect: "Aspeed",
            value: 3,
            sheetid: "speed1"
        },
        {
            name: "Mega Potion of Speed",
            effect: "Aspeed",
            value: 4,
            sheetid: "speed2"
        },
        {
            name: "Ultra Potion of Speed",
            effect: "Aspeed",
            value: 5,
            sheetid: "speed3"
        }
    ],
};

module.exports = function () {
    db.findMany(Player, {}, null, function (result) {
        if (!result || result.length === 0) {
            db.insertMany(Player, data.users);
            console.log("Inserting player data");
        } else {
            console.log("Player data found");
        }
    });
    db.findMany(Weapon, {}, null, function (result) {
        if (!result || result.length === 0) {
            db.insertMany(Weapon, data.weapons);
            console.log("Inserting weapon data");
        } else {
            console.log("Weapon data found");
        }
    });
    db.findMany(Consumable, {}, null, function (result) {
        if (!result || result.length === 0) {
            db.insertMany(Consumable, data.consumables);
            console.log("Inserting consumable data");
        } else {
            console.log("Consumable data found");
        }
    });
    db.findMany(Enemy, {}, null, function (result) {
        if (!result || result.length === 0) {
            db.insertMany(Enemy, data.monsters);
            console.log("Inserting monster data");
        } else {
            console.log("Monster data found");
        }
    });
};