const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()

router.get('/', (req, res) => {
  const type = req.query.type
  const sort = req.query.sort

  return Restaurant.find()
          .lean()
          .sort({ [type]: sort })
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const type = req.query.type
  const sort = req.query.sort

  if (!keyword)
    return Restaurant.find()
          .lean()
          .sort({ [type]: sort })
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error)) 

  return Restaurant.find()
          .lean()
          .sort({ [type]: sort })
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.error(error))
})

module.exports = router