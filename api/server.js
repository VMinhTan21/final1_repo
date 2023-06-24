const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')

const mongoose = require('mongoose')
const config = require('../api/database.js')

const   orderRoute = require('./route/order.js')
const   orderDetailRoute = require('./route/orderDetail.js')
const   drinkRoute = require('./route/drink.js')
const   staffRoute = require('./route/staff.js')


mongoose.Promise = global.Promise

try {
    mongoose.connect(config.DB, {
        dbName: 'CoffeeService',
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Database is connected')
        }) 
}
catch (error) {
    console.log('Database is disconnected or can not connet')
}



app.use(cors())
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
))
app.use(bodyParser.json())

app.use('/api/order', orderRoute)
app.use('/api/orderDetail', orderDetailRoute)
app.use('/api/drink', drinkRoute)
app.use('/api/staff', staffRoute)

app.listen(PORT, function() {
    console.log("Server is running on PORT: ", PORT)
})