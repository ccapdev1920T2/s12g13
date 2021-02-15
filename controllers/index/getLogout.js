module.exports = function (req, res, next) {
    req.session.loggedin = false;
    req.session.username = null;
    res.redirect('/');
};