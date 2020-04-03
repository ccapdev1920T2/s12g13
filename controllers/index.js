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

};

module.exports = controller;