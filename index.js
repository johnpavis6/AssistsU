var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(express.static('./node_modules/jquery/dist'));
app.use(express.static('./node_modules/angular'));
app.use(express.static('./node_modules/bootstrap/dist'));

var userRouter = require('./routes/userRouter'),
    adminRouter = require('./routes/adminRouter');

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.get('/angular', function (req, res) {
    res.render('angular.ejs');
})

app.listen(8080);
console.log('Listening on 8080');