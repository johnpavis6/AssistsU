var User = require('../config/database').User;
var Category = require('../config/database').Category;
var UserToCategoryMapping = require('../config/database').UserToCategoryMapping;
var bcrypt = require('bcryptjs');
module.exports = {
    isUserLoggedIn: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.render('user/home', { csrf_token: req.csrfToken(), message: "" });
            return;
        }
        res.redirect('dashboard');
    },
    isUser: function (req, res, next) {
        var user = new User();
        user.find('first', { fields: ['id', 'password', 'status'], where: `email="${req.body.email}"`, }, function (err, row) {
            if (row == undefined) {
                res.render('user/home', { csrf_token: req.csrfToken(), message: "User Not Exist" });
                return;
            }
            bcrypt.compare(req.body.password, row.password, function (err, flag) {
                if (!flag) {
                    res.render('user/home', { csrf_token: req.csrfToken(), message: "Incorrect Password" });
                    return;
                }
                req.session.user_id = row.id;
                if (row.status == '0') {
                    res.redirect('/mychoices');
                    return;
                }
                res.redirect('/');
            });
        });
    },
    createUser: function (req, res, next) {
        var user = new User();
        user.find('first', { fields: ['id'], where: `email="${req.body.email}"`, }, function (err, row) {
            if (row['id']) {
                res.send({ code: 1, message: "Email already exist" });
                return;
            }
            bcrypt.hash(req.body.password, 10, function (err, hashed_password) {
                var user = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashed_password,
                    dob: req.body.dob,
                    mobile_no: req.body.mobile_no,
                    status: '0',
                });
                user.save();
                res.send({ code: 0, message: "Account successfully created" });
            });
        });
    },
    isUserForChoices: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.redirect('/');
            return;
        }
        var category = new Category();
        category.find('all', { fields: ['id', 'category'], }, function (err, rows) {
            res.render('user/mychoices', { csrf_token: req.csrfToken(), 'categories': rows, code: 0, message: "" });
        });
    },
    setUserToCategoryMapping: function (req, res, next) {
        var category = req.body.category;
        if (typeof (category) == 'string') {
            category = [category,];
        }
        for (var i = 0; i < category.length; i++) {
            var userToCategoryMapping = new UserToCategoryMapping({
                user_id: req.session.user_id,
                category_id: parseInt(category[i]),
            });
            userToCategoryMapping.save();
        }
        var user = new User();
        user.query(`update users set status='1' where id=${req.session.user_id}`, function (err, rows) {
            if (err) {
                res.send(err);
                return;
            }
            res.redirect('/dashboard');
        });
    },
    isUserForDashboard: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.redirect('/');
            return;
        }
        var user = new User();
        user.find('first', { fields: ['first_name', 'last_name'], where: `id=${req.session.user_id}` }, function (err, row) {
            res.render('user/dashboard', { csrf_token: req.csrfToken(), first_name: row.first_name, last_name: row.last_name });
        });
    },
    isUserForArticles: function (req, res, next) {
        if (req.session.user_id == undefined) {
            res.redirect('/');
            return;
        }
        var user = new User();
        user.find('first', { fields: ['first_name', 'last_name'], where: `id=${req.session.user_id}` }, function (err, row) {
            res.render('user/articles', { csrf_token: req.csrfToken(), first_name: row.first_name, last_name: row.last_name });
        });
    },
    signout: function (req, res, next) {
        req.session.user_id = undefined;
        res.redirect('/');
    }
};