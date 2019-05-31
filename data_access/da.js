const Person = require('../models/person');
const Parts = require('../models/parts');
const Manufacturer = require('../models/manufacturer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


function connect2db() {
    mongoose.connect('mongodb://localhost:27017/CarDB',
        { useNewUrlParser: true });

    mongoose.connection.once('open', function () {
        console.log("Connection to MongoDB made...");
    }).on('error', function (error) {
        console.log("Error connecting to MongoDB. Error:", error);
    });
}

function savePerson(p, cb) {
    connect2db();
    var p1 = new Person(p);
        p1.save(function(err){
            if(err) {
                console.log("Error creating user" + err)
            }
            cb(err);
        });
}

function saveParts(p, cb) {
    connect2db();
    var p1 = new Parts(p);
        p1.save(function(err){
            if(err) {
                console.log("Error creating part" + err)
            }
            cb(err);
        });
}

function saveManufacturer(p, cb) {
    connect2db();
    var p1 = new Manufacturer(p);
    p1.save(function(err){
        if(err) {
            console.log("Error creating manufacturer" + err)
        }
        cb(err);
    });
}



function search(pattern, cb) {
    connect2db();
    console.log(pattern);
    Person.find({$or: [
                        {first_name: {$regex: pattern }},
                        {last_name:{$regex: pattern }}
                      ]
    }, function(err, users){
        console.log(users);
        cb(err, users);
    });
}

function searchParts(pattern, cb) {
    connect2db();
    Parts.find({$or: [
                        {parts_name: {$regex: pattern }}
                      ]
    }, function(err, parts){
        cb(err, parts);
    });
}

function searchManufacturer(pattern, cb) {
    connect2db();
    Manufacturer.find({$or: [
                                {manufacturer_name: {$regex: pattern }}
                            ]
    }, function(err, manufacturer){
        console.log(manufacturer);
        cb(err, manufacturer);
    });
}

function deleteUser(id, cb) {
    connect2db();
    Person.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting user" + err);
       }
       cb(err);
    });
}

function deleteParts(id, cb) {
    connect2db();
    Parts.deleteOne({"_id": id}, function (err, res) {
       if(err) {
           console.log("Error deleting part" + err);
       }
       cb(err);
    });
}

function deleteManufacturer(id, cb) {
    connect2db();
    Manufacturer.deleteOne({"_id": id}, function (err, res) {
        if(err) {
            console.log("Error deleting manufacturer" + err);
        }
        cb(err);
    });
}

function getAllPersons(cb) {
    connect2db();
    Person.find(function(err, users) {
        if(err) {
            console.log('Error getting users' + err);
        }
        cb(err, users);
    });
}

function getAllParts(cb) {
    connect2db();
    Parts.find(function(err, parts) {
        if(err) {
            console.log('Error getting parts' + err);
        }
        cb(err, parts);
    });
}

function getAllManufacturer(cb) {
    connect2db();
    Manufacturer.find(function(err, manufacturer) {
        if(err) {
            console.log('Error getting manufacturer' + err);
        }
        cb(err, manufacturer);
    });
}


function getPersonByUsername(username, cb) {
    connect2db();
    Person.findOne({'username': username}, function(err, user){
        cb(err, user);
    });
}


function getPersonById(userid, cb) {
    connect2db();
    Person.findOne({'_id': userid}, function(err, user){
        cb(err, user);
    });
}

function getPartsById(userid, cb) {
    connect2db();
    Person.findOne({'_id': userid}, function(err, user){
        cb(err, user);
    });
}

function getManufacturerById(userid, cb) {
    connect2db();
    Manufacturer.findOne({'_id': userid}, function(err, user){
        cb(err, user);
    });
}


function updateOutPrice(userid, outprice, cb) {
    connect2db();
    console.log(userid, outprice);
    Parts.updateOne({'_id': userid}, {$set: {'outprice': outprice}}, function(err){
    cb(err);
});
}


module.exports = {
    savePersonFromForm: savePerson,
    savePartsFromForm: saveParts,
    saveManufacturerFromForm: saveManufacturer,
    findPersons: getAllPersons,
    findParts: getAllParts,
    findManufacturer: getAllManufacturer,
    search: search,
    searchParts: searchParts,
    searchManufacturer: searchManufacturer,
    deleteUser: deleteUser,
    deleteParts: deleteParts,
    deleteManufacturer: deleteManufacturer,
    getUserByUsername: getPersonByUsername,
    getUserById: getPersonById,
    getPartsById: getPartsById,
    getManufacturerById: getManufacturerById,
    updateOutPrice: updateOutPrice
};