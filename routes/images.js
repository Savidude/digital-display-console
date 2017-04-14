var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('images', { title: 'Digital Display Console' });
});

module.exports = router;
