var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET parts listing. */
router.get('/', function(req, res, next) {
  da.findParts(function(err, parts) {
    var userid = req.session['userid'];
    if(userid){
      da.getPartsById(userid, function(err, user){
        res.render('parts/parts', {title:'Parts', parts_list: parts, userid: userid});
      });
    }
    else {
      res.render('parts/parts', {title:'Parts List', parts_list: parts, userid: userid});
    }

  });
});

router.post('/', function(req, res, next) {
  da.savePartsFromForm(req.body, function(err) {
    res.redirect('/parts');
  });
});

router.post('/updateoutprice', function(req, res) {
  var userid = req.query.userid;
  var outprice = req.body.outprice;
  console.log(req.query.userid, req.body.outprice);
  da.updateOutPrice(userid, outprice, function(err){
    res.redirect('/parts');
  });
});


router.get('/add', function(req, res){
  var userid = req.session['userid'];
  res.render('parts/add', {title: 'Add Part', userid: userid});
});

router.get('/delete', function(req, res){
  da.deleteParts(req.query.id, function(err){
    res.redirect('/parts');
  });
});

router.get('/add_friend', function(req, res){
  da.addFriend(req.session['userid'], req.query.id, function(err){
    res.redirect('/parts');
  });
});

module.exports = router;
