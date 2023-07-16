const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()

router.get('/', (req, res) => {
  const type = req.query.type
  const sort = req.query.sort
  const userId = req.user._id
  return Restaurant.find({ userId })
          .lean()
          .sort({ [type]: sort })
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const type = req.query.type
  const sort = req.query.sort
  const userId = req.user._id
  if (!keyword)
    return Restaurant.find({ userId })
          .lean()
          .sort({ [type]: sort })
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.log(error)) 

  return Restaurant.find({ userId })
          .lean()
          .sort({ [type]: sort })
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.log(error))
})

module.exports = router