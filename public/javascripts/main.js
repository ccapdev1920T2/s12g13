$(document).ready(function () {
    let oof = new Audio('/sounds/oof.mp3');
    let click = new Audio('/sounds/click.mp3');
    let woosh = new Audio('/sounds/enderman-whoosh.mp3');
    let monsters = [];
    let weapons = [];
    let consumables = [];
    let monster;
    let currHP;
    let currUser;
    let attackInterval;

    $.ajax({
        method: "GET",
        url: "/getMonsters",
        cache: false,
        success: function (mresult) {
            monsters = mresult;
            $.ajax({
                method: "GET",
                url: "/getWeapons",
                cache: false,
                success: function (wresult) {
                    weapons = wresult;
                    $.ajax({
                        method: "GET",
                        url: "/getConsumables",
                        cache: false,
                        success: function (cresult) {
                            consumables = cresult;
                            $.ajax({
                                method: "GET",
                                url: "/getUser",
                                cache: false,
                                success: function (uresult) {
                                    currUser = uresult;
                                    updatePlayerInfo();
                                    spawnMonster();
                                    attackInterval = setInterval(function () { damage(currUser.atk); }, 1000/currUser.aspeed);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    
    $('.menuoption').click(function () {
        if ($(this).attr('id') === 'saveoption') {
            return;
        }

        $('.selected').removeClass('selected');
        $(this).addClass('selected');

        if ($(this).attr('id') !== "logoutoption") {
            save();
            $('.menu').addClass('hidden');
        }

        if ($(this).attr('id') === 'skillsoption') {
            $('#skillsmenu').removeClass('hidden');
        }

        if ($(this).attr('id') === 'itemsoption') {
            $('#itemsmenu').removeClass('hidden');
        }

        if ($(this).attr('id') === 'leaderboardoption') {
            $('#leaderboardmenu').removeClass('hidden');
        }

        if ($(this).attr('id') === 'searchoption') {
            $('#searchmenu').removeClass('hidden');
        } else if ($(this).attr('id') !== 'logoutoption') {
            $('#searchresult').addClass('hidden');
            $('#searchbar').val("");
        }

        if ($(this).attr('id') === 'editoption') {
            $('#editmenu').removeClass('hidden');
        } else if ($(this).attr('id') !== 'logoutoption') {
            $('.editchoice').removeClass('hidden');
            $('#password').val('');
        }
    });

    $('#monster').click(function () {  
        let oofCopy = oof.cloneNode();
        oofCopy.play();
        let atk = currUser.atk;
        
        if (currUser.equippedWeapon) {
            let index = findIndex(weapons, currUser.equippedWeapon);
            let weapon = weapons[index];
            atk += weapon.damage * currUser.weaponprof;
            
            if (weapon.type === 'Scissors' && monster.type === 'Paper') {
                atk *= 1.5;
            } else if (weapon.type === 'Paper' && monster.type === 'Rock') {
                atk *= 1.5;
            } else if (weapon.type === 'Rock' && monster.type === 'Scissors') {
                atk *= 1.5;
            }
        }

        if (Math.random() < currUser.critchance)
            atk *= currUser.critdamage;

        damage(atk);
    });
    
    $('#items').on('click', '.itemrow', function(){
        let clickCopy = click.cloneNode();
        clickCopy.play();

        $('#equippeditem>.itemrow').trigger('click')

        let itemname = $(this).find('.itemname').text();
        let index = currUser.weapons.indexOf(itemname);

        if (index !== -1) {
            currUser.equippedWeapon = itemname;
            currUser.weapons.splice(index, 1);
            updatePlayerInfo();
        }
    });

    $('#equippeditem').on('click', '.itemrow', function () {
        let itemname = $(this).find('.itemname').text();
        let index = findIndex(weapons, itemname);

        if (index !== -1) {
            currUser.equippedWeapon = null;
            currUser.weapons.push(itemname);
            updatePlayerInfo();
        }
    });

    $('#consumables').on('click', '.itemrow', function () {
        let itemname = $(this).find('.itemname').text();
        let index = currUser.consumables.indexOf(itemname);

        if (index !== -1) {
            currUser.consumables.splice(index, 1);
            index = findIndex(consumables, itemname);
            let consumable = consumables[index];

            switch (consumable.effect) {
                case 'Adamage': {
                    switch (consumable.value) {
                        case 2: currUser.atk += 5; break;
                        case 3: currUser.atk += 10; break;
                        case 4: currUser.atk += 20; break;
                        case 5: currUser.atk *= 2; break;
                    }
                    break;
                }
                case 'Aspeed': {
                    switch (consumable.value) {
                        case 2: currUser.aspeed += 0.1; break;
                        case 3: currUser.aspeed += 0.2; break;
                        case 4: currUser.aspeed += 0.3; break;
                        case 5: currUser.aspeed *= 2; break;
                    }
                    break;
                }
                case 'Cchance': {
                    switch (consumable.value) {
                        case 2: currUser.critchance += 0.1; break;
                        case 3: currUser.critchance += 0.2; break;
                        case 4: currUser.critchance += 0.3; break;
                        case 5: currUser.critchance *= 2; break;
                    }
                    break;
                }
                case 'Cdamage': {
                    switch (consumable.value) {
                        case 2: currUser.critdamage += 0.1; break;
                        case 3: currUser.critdamage += 0.2; break;
                        case 4: currUser.critdamage += 0.3; break;
                        case 5: currUser.critdamage *= 2; break;
                    }
                    break;
                }
            }

            clearInterval(attackInterval);
            attackInterval = setInterval(function () { damage(currUser.atk); }, 1000/currUser.aspeed);
            updatePlayerInfo();
        }
    });

    $('#terrain').click(function () {
        let wooshCopy = woosh.cloneNode();
        wooshCopy.play();

        let terrains = [
            '/images/terrain/grass.png',
            '/images/terrain/cobblestone.png',
            '/images/terrain/obsidian.png',
            '/images/terrain/netherrack.png',
            '/images/terrain/endstone.png'
        ]

        let terrain =  terrains[Math.floor(Math.random() * terrains.length)];

        $(this).css('background-image', `url(${terrain})`);
    });

	$('#searchbutton').click(function () {
        if($('#searchbar').val() != ''){
           displaySearch($('#searchbar').val());
        }
        else
        {
            $('#searcherror').text("Please input a username");
        }
    });
    
    $('#leaderboardoption').click(function () {
        $.ajax({
            method: "GET",
            url: "/getLeaders",
            cache: false,
            success: function (result) {
                for (let i = 0; i < 10; i++) {
                    if (i < result.length) {
                        $(`#rank${i + 1} .leaderlvlval`).text(result[i].level);
                        $(`#rank${i + 1} .leaderunval`).text(result[i].uName);
                        $(`#rank${i + 1}`).parent().removeClass('hidden');
                    } else {
                        $(`#rank${i + 1}`).parent().addClass('hidden');
                    }
                }
            }
        })
    });

    $('#saveoption').click(function () {
        save();
    });

    $('.leaderboard').click(function () {
        $('#leaderboardoption').removeClass('selected');
        $('#searchoption').addClass('selected');
        $('#leaderboardmenu').addClass('hidden');
        $("#searchmenu").removeClass('hidden');
        displaySearch($(this).find('.leaderunval').text());
    })

    $('#changeitemsbutton').click(function () {
        let newuser = $('#newuser').val();
        let newpass = $('#newpass').val();
        let cnewpass = $('#cnewpass').val();
        let newemail = $('#newemail').val();
        let password = $('#password').val();

        $.post('/edit', {
            newuser: newuser,
            newpass: newpass,
            cnewpass: cnewpass,
            newemail: newemail,
            password: password
        }, function (result) {
            if (result) {
                alert(result);
            }
        });

        /* reset fields*/
        $('#newuser').val("");
        $('#newpass').val("");
        $('#cnewpass').val("");
        $('#newemail').val("");
        $('#password').val('');
    });

    $('#attackdamage .rarrow').click(function () {
        if (currUser.spoints > 0) {
            currUser.spoints -= 1;
            currUser.atk += 5;
            updatePlayerInfo();
            clearInterval(attackInterval);
            attackInterval = setInterval(function () { damage(currUser.atk); }, 1000/currUser.aspeed);
        }
    });

    $('#critchance .rarrow').click(function () {
        if (currUser.spoints > 0) {
            currUser.spoints -= 1;
            currUser.critchance += 0.1;
            updatePlayerInfo();
        }
    });

    $('#critdamage .rarrow').click(function () {
        if (currUser.spoints > 0) {
            currUser.spoints -= 1;
            currUser.critdamage += 0.1;
            updatePlayerInfo();
        }
    });

    $('#attackspeed .rarrow').click(function () {
        if (currUser.spoints > 0) {
            currUser.spoints -= 1;
            currUser.aspeed += 0.1;
            updatePlayerInfo();
            clearInterval(attackInterval);
            attackInterval = setInterval(function () { damage(currUser.atk); }, 1000/currUser.aspeed);
        }
    });

    $('#weaponprof .rarrow').click(function () {
        if (currUser.materials >= 100) {
            currUser.materials -= 100;
            currUser.weaponprof += 1;
            updatePlayerInfo();
        }
    });

    //FUNCTIONS
    function displaySearch (uName) {
        $.ajax({
            method: "GET",
            url: "/getUser",
            data: { uName: uName },
            cache: false,
            success: function (result) {
                if (result.uName == uName) {
                    $('#searchresult').removeClass('hidden');
                    $('#searchplayername').text(result.uName);
                    $('#searchlvlval').text(result.level);
                    $('#searchadval').text(result.atk);
                    $('#searchasval').text(result.aspeed.toFixed(2));
                    $('#searchccval').text(Math.floor(result.critchance * 100));
                    $('#searchcdval').text(Math.floor(result.critdamage * 100));
                    $('#searchwval').text(result.weaponprof);
                    $('#searcherror').text("");
                } else {
                    $('#searcherror').text("Player not found");
                }
            }
        });
    }
    
    function spawnMonster () {
        monster = monsters[Math.floor(Math.random() * monsters.length)];

        $('#monster').css('background-image', `url(${monster.src})`);
        $('#monstername').text(monster.name);
        $('#type').text(monster.type + ' Type');
        $('#curhealth').text((monster.hp * currUser.level).toFixed(2));
        $('#maxhealth').text((monster.hp * currUser.level).toFixed(2));
        currHP = monster.hp * currUser.level;
        $('#healthvar').css("width", (currHP / (monster.hp * currUser.level)) * 100 + '%');

        $('#typeicon').removeClass();
        $('#typeicon').addClass(monster.type);

        console.log('ouch');
    }

    function rollDrops () {
        if (Math.random() < 0.05) {
            if (Math.random() < 0.5) {
                let weapon = monster.weapondrops[Math.floor(Math.random() * monster.weapondrops.length)];
                if (!currUser.weapons) {
                    currUser.weapons = [weapon];
                } else if (currUser.weapons.indexOf(weapon) === -1 && currUser.equippedWeapon !== weapon) {
                    currUser.weapons.push(weapon);
                } else {
                    currUser.materials += 10;
                }
            } else {
                let consumable = monster.consumabledrops[Math.floor(Math.random() * monster.consumabledrops.length)];
                currUser.consumables.push(consumable);
                currUser.materials += 5;
            }
            updatePlayerInfo();
        }
    }

    function damage (dmg) {
        currHP -= dmg;
        currHP = (Math.round(currHP * 100) / 100).toFixed(2);
        $('#curhealth').text(currHP);
        $('#healthvar').css("width", (currHP / (monster.hp * currUser.level)) * 100 + '%');
        if (currHP <= 0) {
            currUser.exp += monster.expdrop;
            currUser.materials += 1;
            let xpToNextLevel = getXpToNextLevel();
            if (currUser.exp >= xpToNextLevel) {
                currUser.exp -= xpToNextLevel;
                currUser.level += 1;
                currUser.spoints += currUser.level;
            }
            updatePlayerInfo();
            rollDrops();
            spawnMonster();
        }
    }

    function save () {
        let {level, atk, aspeed, critchance, critdamage, equippedWeapon, weapons, consumables, exp, materials, spoints, weaponprof} = currUser;

        $.ajax({
            method: "POST",
            url: "/save",
            data: {
                level: level,
                atk: atk,
                aspeed: aspeed,
                critchance: critchance,
                critdamage: critdamage,
                equippedWeapon: equippedWeapon,
                weapons: weapons,
                consumables: consumables,
                exp: exp,
                materials: materials,
                spoints: spoints,
                weaponprof: weaponprof,
            }
        });
    }

    function getXpToNextLevel () {
        return currUser.level * 100;
    }

    function findIndex (list, name) {
        return list.findIndex((element) => {return element.name === name;});
    }

    function updatePlayerInfo () {
        let xpToNextLevel = getXpToNextLevel();

        $('#playername').text(currUser.uName);
        $('#playerlevel').text(currUser.level);
        $('#attackdamage .value').text(currUser.atk);
        $('#critchance .value').text(Math.floor(currUser.critchance * 100));
        $('#critdamage .value').text(Math.floor(currUser.critdamage * 100));
        $('#attackspeed .value').text(currUser.aspeed.toFixed(2));
        $('#weaponprof .value').text(currUser.weaponprof);
        $('#points .value').text(currUser.spoints);
        $('#materials .value').text(currUser.materials);
        $('#curxp').text(currUser.exp);
        $('#nextxp').text(xpToNextLevel);

        $('#equippeditem').empty();
        $('#items').empty();
        $('#consumables').empty();

        if (currUser.equippedWeapon) {
            let index = findIndex(weapons, currUser.equippedWeapon);

            if (index !== -1) {
                let {name, type, sheetid, rarity} = weapons[index];

                $('#equippeditem').append(`
                    <div class="itemrow">
                        <div class="itemsprite itemspritesheet" id="${sheetid}"></div>
                        <a>${rarity} Lvl ${currUser.weaponprof} <span class="itemname">${name}<span></a>
                        <div class="itemclass ${type}"></div>
                    </div>
                `);
            }
        }

        if (currUser.weapons) {
            currUser.weapons.forEach(function (weapon) {
                let index = findIndex(weapons, weapon);

                if (index !== -1) {
                    let {name, type, sheetid, rarity} = weapons[index];
    
                    $('#items').append(`
                        <div class="itemrow">
                            <div class="itemsprite itemspritesheet" id="${sheetid}"></div>
                            <a>${rarity} Lvl ${currUser.weaponprof} <span class="itemname">${name}<span></a>
                            <div class="itemclass ${type}"></div>
                        </div>
                    `);
                }
            });
        }

        if (currUser.consumables) {
            currUser.consumables.forEach(function (consumable) {
                let index = findIndex(consumables, consumable);

                if (index !== -1) {
                    let {name, sheetid} = consumables[index];
    
                    $('#consumables').append(`
                        <div class="itemrow">
                            <div class="itemsprite consumablespritesheet" id="${sheetid}"></div>
                            <a class="itemname">${name}</a>
                        </div>
                    `);
                }
            });
        }
    }
 });