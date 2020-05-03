$(document).ready(function(){
    var oof = new Audio('/sounds/oof.mp3');
    var click = new Audio('/sounds/click.mp3');
    var woosh = new Audio('/sounds/enderman-whoosh.mp3');
    var monsters = [];
    var monster;
    var currHP;
    var currUser;
    $.get('/getMonsters',function(result){
        monsters = result;
        spawnMonster();
    })

    $.get('/getUser',{uName:"adecam"}, function(result){
        currUser = result;
        $('#playername').text(currUser.uName);
        $('#playerlevel').text('Level ' + currUser.level);
        $('#attackdamage .value').text(currUser.atk);
        $('#critchance .value').text(currUser.critchance);
        $('#critdamage .value').text(currUser.critdamage);
        $('#attackspeed .value').text(currUser.aspeed);
        setInterval(function() {damage(currUser.atk)}, 1000/currUser.aspeed);
    })
    
    
    $('.menuoption').click(function () {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');

        if ($(this).attr('id') !== "logoutoption") {
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

            $('#editemail').addClass('hidden');
            $('#edituser').addClass('hidden');
            $('#editpass').addClass('hidden');

            $('#changeitems').addClass('hidden');
            $('#verifypass').removeClass('hidden');

            $('#password').val('');
        }
    });

    
    $('#monster').click(function () {  
        let oofCopy = oof.cloneNode();
        oofCopy.play();
        let atk = currUser.atk;
        if(Math.random()>currUser.critchance)
            atk*=currUser.critdamage;
        damage(atk);
    });
    
    $('#items').on('click', '.itemrow', function(){
        let clickCopy = click.cloneNode();
        clickCopy.play();
        $('#equippeditem>.itemrow').trigger('click');
        $('#equippeditem').append('<div class = "itemrow">' + $(this).html() + '</div>');
        $(this).remove();
       
    })

    $('#equippeditem').on('click', '.itemrow', function(){
        $('#items').append('<div class = "itemrow">' + $(this).html() + '</div>');
        $(this).remove();   
    })

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
            $('#searchbar').css("background-image","url('images/textbar_invalid.png')");
            $('#searcherror').text("Please input a username");
        }
            
		
    });
    
    $('#leaderboardoption').click(function(){
        $.get('/getLeaders',{},function(result){
            let i = 0;
            for(i;i<10;i++){
                $('#rank'+(i+1)+' .leaderlvlval').text(result[i].level);
                $('#rank'+(i+1)+' .leaderunval').text(result[i].uName);
            }
        });
    });

    $('.leaderboard').click(function(){
        $('#leaderboardoption').removeClass('selected');
        $('#searchoption').addClass('selected');
        $('#leaderboardmenu').addClass('hidden');
        $("#searchmenu").removeClass('hidden');
        displaySearch($(this).find('.leaderunval').text());
    })

    $('#verifypassbutton').click(function(){
        $('#verifypass').addClass('hidden');
        $('#changeitems').removeClass('hidden');
    });

    $('#backbutton').click(function(){
        $('#verifypass').removeClass('hidden');
        $('#changeitems').addClass('hidden');

        $('.editchoice').removeClass('hidden');

        $('#editemail').addClass('hidden');
        $('#edituser').addClass('hidden');
        $('#editpass').addClass('hidden');

        $('#password').val('');
    });

    $('#changeitemsbutton').click(function(){
        if ($('#newuser').val() != ''){
            $('#playername').text($('#newuser').val());
            alert("username changed to: "+ $('#newuser').val());
        }
        if ($('#newpass').val() != ''){
            alert("Password changed successfully.");
        }
        if ($('#newemail').val() != ''){
            alert("A verification mail has been sent to the address " + $('#newemail').val() + ".");
        }
        $('#verifypass').removeClass('hidden');
        $('#changeitems').addClass('hidden');
        
        /*reset fields*/
        $('#newuser').val("");
        $('#newpass').val("");
        $('#newemail').val("");

        /* reset view */
        $('.editchoice').removeClass('hidden');
        $('#editemail').addClass('hidden');
        $('#edituser').addClass('hidden');
        $('#editpass').addClass('hidden');
        $('#changeitems').addClass('hidden');
        $('#verifypass').removeClass('hidden');
        $('#password').val('');
    });

    $('#editemailbutton').click(function(){
        $(this).parent('div').addClass('hidden')
        $('#editemail').removeClass('hidden')
    });

    $('#edituserbutton').click(function(){
        $(this).parent('div').addClass('hidden')
        $('#edituser').removeClass('hidden')
    });

    $('#editpassbutton').click(function(){
        $(this).parent('div').addClass('hidden')
        $('#editpass').removeClass('hidden')
    });


    //FUNCTIONS

    function displaySearch(uName){
        $.get('/getUser',{uName:uName}, function(result){
            if(result.uName = uName)
            {
                $('#searchresult').removeClass('hidden');
                $('#searchplayername').text(result.uName);
                $('#searchlvlval').text(result.level);
                $('#searchadval').text(result.atk);
                $('#searchasval').text(result.aspeed);
                $('#searchccval').text(result.critchance);
                $('#searchcdval').text(result.critdamage);
                $('#searchbar').css("background-image","url('images/textbar.png')");
                $('#searcherror').text("");
            }
        })
    }
    
    function spawnMonster(){
        monster = monsters[Math.floor(Math.random() * monsters.length)];

        $('#monster').css('background-image', `url(${monster.src})`);
        $('#monstername').text(monster.name);
        $('#type').text(monster.type + ' Type');
        $('#curhealth').text(monster.hp);
        $('#maxhealth').text(monster.hp);
        currHP = monster.hp;
        $('#healthvar').css("width", (currHP/monster.hp)*100 + '%');

        if (monster.type === 'Paper') {
            $('#typeicon').css('background-image', 'url(/images/typeicons/paper.png)');
        } else if (monster.type === 'Scissor') {
            $('#typeicon').css('background-image', 'url(/images/typeicons/scissors.png)');
        } else if (monster.type === 'Rock') {
            $('#typeicon').css('background-image', 'url(/images/typeicons/rock.png)');
        } else {
            console.log('We did an oopsies');
        }
        console.log('ouch');
    }

    function damage(dmg){
        currHP-=dmg;
        currHP = (Math.round(currHP * 100) / 100).toFixed(2);
        $('#curhealth').text(currHP);
        $('#healthvar').css("width", (currHP/monster.hp)*100 + '%');
        if(currHP<=0){
            currUser.exp+=monster.expdrop;
            //drop items
            spawnMonster();
        }
    }
    
});