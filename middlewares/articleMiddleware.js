module.exports = {
    isSessionExpired: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.send('Session Expired');
            return;
        }
        next();
    },
};