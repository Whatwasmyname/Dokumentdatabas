const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const PartsSchema = new Schema({
    parts_name: String,
    description: String,
    manufacturer: String,
    supplier: String,
    fits: String,
    inprice: Number,
    outprice: Number

}, { collection: 'parts' });

// Create model
const Parts = mongoose.model('parts', PartsSchema);

module.exports = Parts;