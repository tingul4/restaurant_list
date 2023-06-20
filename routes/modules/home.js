const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()

router.get('/', (req, res) => {
  return Restaurant.find()
          .lean()
          .sort({ _id: 'asc'})
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  
  return Restaurant.find()
          .lean()
          .sort({ _id: 'asc'})
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.error(error))
})

module.exports = router