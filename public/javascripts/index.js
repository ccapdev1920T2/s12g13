$(document).ready(function(){
    $('.login-info-box').fadeOut();
    $('.login-show').addClass('show-log-panel');
    $('#forgot').hide();
    
    $('#label-login').on('click', function() {
        $('.register-info-box').fadeIn();
        $('.login-info-box').fadeOut();
        
        $('.white-panel').removeClass('right-log');
        
        $('.login-show').addClass('show-log-panel');
        $('.register-show').removeClass('show-log-panel');
    });
    
    $('#label-register').on('click', function() {
        $('.register-info-box').fadeOut(); 
        $('.login-info-box').fadeIn();
        
        $('.white-panel').addClass('right-log');
        $('.register-show').addClass('show-log-panel');
        $('.login-show').removeClass('show-log-panel');

        $('#forgot').fadeOut();
    });

    $('#logsubmit, #regsubmit, #forgotsubmit').prop('disabled', true);

    $('#login').on('input propertychange paste', 'input', function () {
        $('#forgot').fadeOut();

        let userFlag = true;
        let passFlag = true;
        
        if ($('#loguser').val() === '') {
            userFlag = false;
        }

        if ($('#logpass').val() === '') {
            passFlag = false;
        }

        if ($(this).attr('id') === 'loguser') {
            if (userFlag) {
                $(this).attr('data-error', 'false')
            } else {
                $(this).attr('data-error', 'true')
            }
        } else if ($(this).attr('id') === 'logpass') {
            if (passFlag) {
                $(this).attr('data-error', 'false')
            } else {
                $(this).attr('data-error', 'true')
            }
        } else {
            console.log('oh would you look at that you broke my login form')
        }

        if (userFlag && passFlag) {
            $('#logsubmit').prop('disabled', false);
        } else {
            $('#logsubmit').prop('disabled', true);
        }
    });

    $('#register').on('input propertychange paste', 'input', function () {
        let userFlag = true;
        let emailFlag = true;
        let passFlag = true;
        let cpassFlag = true;
        
        if ($('#reguser').val() === '') {
            userFlag = false;
        }

        if ($('#regemail').val() === '' || !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#regemail').val()))) {
            emailFlag = false;
        }

        if ($('#regpass').val() === '') {
            passFlag = false;
        }

        if ($('#regcpass').val() === '' || $('#regcpass').val() !== $('#regpass').val()) {
            cpassFlag = false;
        }

        if ($(this).attr('id') === 'reguser') {
            if (userFlag) {
                $(this).attr('data-error', 'false')
            } else {
                $(this).attr('data-error', 'true')
            }
        } else if ($(this).attr('id') === 'regemail') {
            if (emailFlag) {
                $(this).attr('data-error', 'false')
            } else {
                $(this).attr('data-error', 'true')
            }
        } else if ($(this).attr('id') === 'regpass') {
            if (passFlag) {
                $(this).attr('data-error', 'false')
            } else {
                $(this).attr('data-error', 'true')
            }
        } else if ($(this).attr('id') === 'regcpass') {
            if (cpassFlag) {
                $(this).attr('data-error', 'false')
            } else {
                $(this).attr('data-error', 'true')
            }
        } else {
            console.log('oh would you look at that you broke my registration form')
        }

        if (userFlag && emailFlag && passFlag && cpassFlag) {
            $('#regsubmit').prop('disabled', false);
        } else {
            $('#regsubmit').prop('disabled', true);
        }
    });

    $('#forgot').on('input propertychange paste', 'input', function () {
        if ($(this).val() === '') {
            $(this).attr('data-error', 'true')
            $('#forgotsubmit').prop('disabled', true);
        } else {
            $(this).attr('data-error', 'false')
            $('#forgotsubmit').prop('disabled', false);
        }
    });

    $('#forgotflag').click(function () {
        $('#forgot').fadeIn();
    });
});