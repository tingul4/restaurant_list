const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // load Restaurant schema
const restaurant_data = require('../../restaurant.json')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  // load data from restaurant.json
  restaurant_data.results.forEach(obj => Restaurant.create(obj))
  console.log('done')
})