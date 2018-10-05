var xss = require('xss');
module.exports = {
    isSessionExpired: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.send('Session Expired');
            return;
        }
        next();
    },
    addNote: function (req, res, next) {
        req.body.title = xss(req.body.title);
        req.body.description = xss(req.body.description);
        next();
    },
};