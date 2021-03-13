const controller = {
    getIndex: function (_req, res, _next) {
        res.render('index');
    },
    getMain: function (_req, res, _next) {
        res.render('main');
    },
    getAbout: function (_req, res, _next) {
        res.render('about');
    },
    getMonsters: require('./index/getMonsters'),
    getUser: require('./index/getUser'),
    getLeaders: require('./index/getLeaders'),
    postRegister: require('./index/postRegister'),
    postForgot: require('./index/postForgot'),
    getConfirm: require('./index/getConfirm'),
    getForgot: require('./index/getForgot'),
    postLogin: require('./index/postLogin'),
    getLogout: require('./index/getLogout'),
    postEdit: require('./index/postEdit'),
    postSave: require('./index/postSave'),
    getWeapons: require('./index/getWeapons'),
    getConsumables: require('./index/getConsumables'),
};

module.exports = controller;