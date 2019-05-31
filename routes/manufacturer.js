var express = require('express');
var router = express.Router();
var da = require('../data_access/da');


/* GET parts listing. */

router.get('/', function(req, res, next) {
    da.findManufacturer(function(err, manufacturer) {
        var userid = req.session['userid'];
        if(userid){
            da.getManufacturerById(userid, function(err, manufacturer){
                res.render('manufacturer/manufacturer', {title:'Manufacturer', manufacturer_list: manufacturer, userid: userid});
            });
        }
        else {
            res.render('manufacturer/manufacturer', {title:'Manufacturer List', manufacturer_list: manufacturer, userid: userid});
        }

    });
});

router.post('/', function(req, res, next) {
    da.saveManufacturerFromForm(req.body, function(err) {
        res.redirect('/manufacturer');
    });
});


router.get('/add', function(req, res){
    var userid = req.session['userid'];
    res.render('manufacturer/add', {title: 'Add Manufacturer', userid: userid});
});

router.get('/delete', function(req, res){
    da.deleteManufacturer(req.query.id, function(err){
        res.redirect('/manufacturer');
    });
});

module.exports = router;
