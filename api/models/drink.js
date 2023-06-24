
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Drink = new Schema({
    ObjectID: String,
    DrinkName: String,
    DrinkPrice: Number
})

module.exports = mongoose.model('drinks', Drink)