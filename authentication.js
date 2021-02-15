module.exports = {
    checkAuthenticated: function (req, res, next) {
        if (req.session.loggedin === true && req.session.username) {
          return res.redirect("/main");
        }
        next();
    },
    checkNotAuthenticated: function (req, res, next) {
        if (req.session.loggedin === true && req.session.username) {
            return next();
        }
        res.redirect("/");
    },
};