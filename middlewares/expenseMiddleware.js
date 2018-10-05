var xss = require('xss');
module.exports = {
    isSessionExpired: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.send('Session Expired');
            return;
        }
        next();
    },
    addExpense: function (req, res, next) {
        req.body.category = xss(req.body.category);
        req.body.money_spent = xss(req.body.money_spent);
        req.body.spent_at_date = xss(req.body.spent_at_date);
        req.body.spent_at_time = xss(req.body.spent_at_time);
        req.body.spent_at_merediem = xss(req.body.spent_at_merediem);
        next();
    },
};