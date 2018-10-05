var Category = require('../config/database').Category;
module.exports = {
    setUserToCategoryMapping: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.redirect('/');
            return;
        }
        if (req.body.category != undefined) {
            next();
            return;
        }
        var category = new Category();
        category.find('all', { fields: ['id', 'category'], }, function (err, rows) {
            res.render('user/mychoices', { csrf_token: req.csrfToken(), categories: rows, code: 1, message: "Choose atleast one Category" });
        });
    },
};