const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()

router.get('/:sortedType', (req, res) => {
  const sortedType = req.params.sortedType

  switch (sortedType) {
    case 'asc':
      return Restaurant.find()
          .lean()
          .sort({ name: 'asc'})
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error))
    case 'desc':
      return Restaurant.find()
          .lean()
          .sort({ name: 'desc'})
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error))
    case 'category':
      return Restaurant.find()
          .lean()
          .sort({ category: 'asc'})
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error))
    case 'location':
      return Restaurant.find()
          .lean()
          .sort({ location: 'asc'})
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error))
  }
})

router.get('/search/:sortedType', (req, res) => {
  const keyword = req.query.keyword
  const sortedType = req.params.sortedType

  switch (sortedType) {
    case 'asc':
      return Restaurant.find()
          .lean()
          .sort({ name: 'asc'})
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.error(error))
    case 'desc':
      return Restaurant.find()
          .lean()
          .sort({ name: 'desc'})
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.error(error))
    case 'category':
      return Restaurant.find()
          .lean()
          .sort({ category: 'asc'})
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.error(error))
    case 'location':
      return Restaurant.find()
          .lean()
          .sort({ location: 'asc'})
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.error(error))
  }
  
})

module.exports = router