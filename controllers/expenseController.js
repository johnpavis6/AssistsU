var Expense = require('../config/database').Expense;
module.exports = {
    getExpenses: function (req, res, next) {
        var expense = new Expense();
        expense.find('all', { where: `user_id=${req.session.user_id}`, }, function (err, rows) {
            res.send({ code: 0, expenses: rows });
        });
    },
    addExpense: function (req, res, next) {
        var expense = new Expense({
            user_id: req.session.user_id,
            category: req.body.category,
            money_spent: req.body.money_spent,
            spent_at_date: req.body.spent_at_date,
            spent_at_time: req.body.spent_at_time,
            spent_at_merediem: req.body.spent_at_merediem,
        });
        expense.save();
        res.send({ code: 0, message: 'Expense added Successfully' });
    },
};