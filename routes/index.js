var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userid = req.session['userid'];
  res.render('index', { title: 'mitt Mästerverk', userid: userid });
});

module.exports = router;
