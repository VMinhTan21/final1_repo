const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Staff = new Schema({
    ObjectID: String,
    name: String,
    birthDate: Date,
    address: String,
    phone: String
});

module.exports = mongoose.model('staff', Staff);
