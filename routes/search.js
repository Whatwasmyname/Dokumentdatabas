var express = require('express');
var router = express.Router();
var da = require('../data_access/da');

router.post('/user', function(req, res){
    da.search(req.body['search'], function(err, users){
        console.log(users);
        var userid = req.session['userid'];
        da.getUserById(userid, function(err, user){
            res.render('users/users', {title:'User listing', user_list: users, userid: userid});
        });
    });
});

router.post('/parts', function(req, res){
    da.searchParts(req.body['search'], function(err, parts){
        res.render('parts/parts', {title:'Parts List', parts_list: parts});
    });
});

router.post('/manufacturer', function(req, res){
    da.searchManufacturer(req.body['search'], function(err, manufacturer){
        res.render('manufacturer/manufacturer', {title:'Manufacturer List', manufacturer_list: manufacturer});
    });
});



module.exports = router;