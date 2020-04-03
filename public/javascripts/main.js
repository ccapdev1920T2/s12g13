$(document).ready(function(){
    var oof = new Audio('/sounds/oof.mp3');
    var click = new Audio('/sounds/click.mp3');
    var woosh = new Audio('/sounds/enderman-whoosh.mp3');

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

        let monsters = [
        {
            "name": "Jeremiah Finklehorn",
            "type": "Paper",
            "src": "/images/monsters/jeremiah.png"
        },
        {
            "name": "Jamal Finklehorn",
            "type": "Scissor",
            "src": "/images/monsters/jamal.png"
        },
        {
            "name": "Jeremy Finklehorn",
            "type": "Scissor",
            "src": "/images/monsters/jeremy.png"
        },
        {
            "name": "J3r3-m4h Finklehorn",
            "type": "Rock",
            "src": "/images/monsters/j3r3-m4h.png"
        },
        {
            "name": "Cement Ngo",
            "type": "Rock",
            "src": "/images/monsters/cement.png"
        },
        {
            "name": "Lament Ngo",
            "type": "Paper",
            "src": "/images/monsters/lament.png"
        },
        {
            "name": "Chuck Dynasty",
            "type": "Rock",
            "src": "/images/monsters/chuck_dynasty.png"
        },
        {
            "name": "Gibson Googleburts",
            "type": "Rock",
            "src": "/images/monsters/gibson.png"
        },{
            "name": "John Campbell",
            "type": "Rock",
            "src": "/images/monsters/john.png"
        },
        {
            "name": "Mr. Oui",
            "type": "Paper",
            "src": "/images/monsters/mr_oui.gif"
        },
        {
            "name": "Sad Joey",
            "type": "Scissor",
            "src": "/images/monsters/sad_joey.png"
        },
        {
            "name": "Tom",
            "type": "Paper",
            "src": "/images/monsters/tom.png"
        }];

        let monster = monsters[Math.floor(Math.random() * monsters.length)];

        $('#monster').css('background-image', `url(${monster.src})`);
        $('#monstername').text(monster.name);
        $('#type').text(monster.type + ' Type');

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
            $('#searchresult').removeClass('hidden');
            $('#searchplayername').text($('#searchbar').val());
            $('#searchbar').css("background-image","url('images/textbar.png')");
            $('#searcherror').text("")
        }
        else
        {
            $('#searchbar').css("background-image","url('images/textbar_invalid.png')");
            $('#searcherror').text("Please input a username");
        }
            
		
	});

    $('.leaderboard').click(function () {
        $('.selected').removeClass('selected');
        $('#searchoption').addClass('selected');

        $('#leaderboardmenu').addClass('hidden');
        $('#searchmenu').removeClass('hidden');
        $('#searchresult').removeClass('hidden');
        $('#searchplayername').text($(this).find('.username').text());
        $('#searchbar').val($(this).find('.username').text());
    });

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

});