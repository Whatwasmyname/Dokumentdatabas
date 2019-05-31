const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ManufacturerSchema = new Schema({
    manufacturer_name: String,
    headoffice: String,
    adress: String

}, { collection: 'manufacturer' });

// Create model
const Manufacturer = mongoose.model('manufacturer', ManufacturerSchema);

module.exports = Manufacturer;