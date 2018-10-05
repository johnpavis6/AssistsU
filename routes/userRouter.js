var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csrf = require('csurf');

var parseForm = bodyParser.urlencoded({ extended: false });
var csrfProtection = csrf({ cookie: true });
var app = express.Router();

var userController = require('../controllers/userController'), userMiddleware = require('../middlewares/userMiddleware');
var articleController = require('../controllers/articleController'), articleMiddleware = require('../middlewares/articleMiddleware');
var expenseController = require('../controllers/expenseController'), expenseMiddleware = require('../middlewares/expenseMiddleware');
var noteController = require('../controllers/noteController'), noteMiddleware = require('../middlewares/noteMiddleware');

app.use(cookieParser());
app.use(session({
    secret: "Its secret", resave: false,
    saveUninitialized: true,
}));


app.get('/', csrfProtection, userController.isUserLoggedIn)

app.post('/', parseForm, csrfProtection, userController.isUser);

app.post('/signup', parseForm, csrfProtection, userController.createUser);

app.get('/mychoices', csrfProtection, userController.isUserForChoices);

app.post('/mychoices', parseForm, csrfProtection, userMiddleware.setUserToCategoryMapping, userController.setUserToCategoryMapping);

app.get('/signout', userController.signout);

app.get('/dashboard', csrfProtection, userController.isUserForDashboard);

app.get('/articles', csrfProtection, userController.isUserForArticles);

app.post('/expenses', parseForm, csrfProtection, expenseMiddleware.isSessionExpired, expenseController.getExpenses);

app.post('/expense', parseForm, csrfProtection, expenseMiddleware.isSessionExpired, expenseMiddleware.addExpense, expenseController.addExpense);

app.post('/notes', parseForm, csrfProtection, noteMiddleware.isSessionExpired, noteController.getNotes);

app.post('/note', parseForm, csrfProtection, noteMiddleware.isSessionExpired, noteMiddleware.addNote, noteMiddleware.addNote, noteController.addNote);

app.post('/feeds', parseForm, csrfProtection, articleMiddleware.isSessionExpired, articleController.fetch);

// app.all('*', function (req, res) {
//     res.send('Page Not Found');
// });

module.exports = app;