var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('admin');
});

router.post('/fetch',function(req,res){
    res.send({'results':'hello'});
});

module.exports = router;