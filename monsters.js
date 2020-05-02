const db = require('./models/db.js');
db.connect();
const Enemy = require('./models/EnemyModel.js');

let monsters = [
        {
            name: "Jeremiah Finklehorn",
            type: "Paper",
            src: "/images/monsters/jeremiah.png"
        },
        {
            name: "Jamal Finklehorn",
            type: "Scissor",
            src: "/images/monsters/jamal.png"
        },
        {
            name: "Jeremy Finklehorn",
            type: "Scissor",
            src: "/images/monsters/jeremy.png"
        },
        {
            name: "J3r3-m4h Finklehorn",
            type: "Rock",
            src: "/images/monsters/j3r3-m4h.png"
        },
        {
            name: "Cement Ngo",
            type: "Rock",
            src: "/images/monsters/cement.png"
        },
        {
            name: "Lament Ngo",
            type: "Paper",
            src: "/images/monsters/lament.png"
        },
        {
            name: "Chuck Dynasty",
            type: "Rock",
            src: "/images/monsters/chuck_dynasty.png"
        },
        {
            name: "Gibson Googleburts",
            type: "Rock",
            src: "/images/monsters/gibson.png"
        },{
            name: "John Campbell",
            type: "Rock",
            src: "/images/monsters/john.png"
        },
        {
            name: "Mr. Oui",
            type: "Paper",
            src: "/images/monsters/mr_oui.gif"
        },
        {
            name: "Sad Joey",
            type: "Scissor",
            src: "/images/monsters/sad_joey.png"
        },
        {
            name: "Tom",
            type: "Paper",
            src: "/images/monsters/tom.png"
        }];

        let i = 0;
        for(i=0;i<monsters.length;i++){
            let enemy = new Enemy(monsters[i]);
            enemy.save(function (err) {
                if (err) return handleError(err);
                else console.log("saved");
            })
        }