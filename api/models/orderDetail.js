
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let OrderDetail = new Schema({
    ObjectID: String,
    Drink: String,
    Price: Number,
    Qty: Number
})

module.exports = mongoose.model('orderDetails', OrderDetail)