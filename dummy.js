const db = require('./models/db.js');
db.connect();
const Player = require('./models/PlayerModel.js');

//data 1
var player = new Player({uName: "adecam", pw: "12345", email: "d@m.com"});
player.save(function (err) {
    if (err) return handleError(err);
    else console.log('saved');
  });


//data 2
var player = new Player({uName: "adecam1", pw: "12345", email: "d@m1.com", level: 2});
player.save(function (err) {
    if (err) return handleError(err);
    else console.log('saved 2');
  });

//data 3
var player = new Player({uName: "adecam12", pw: "123456", email: "d@m2.com", level: 3, atk: 5});
player.save(function (err) {
    if (err) return handleError(err);
    else console.log('saved 3');
  });