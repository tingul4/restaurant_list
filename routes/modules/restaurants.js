const express = require('express')
const Restaurant = require('../../models/restaurant')
const restaurant = require('../../models/restaurant')

const router = express.Router()

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.deleteOne({ _id, userId })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const editInfo = req.body
  const userId = req.user._id
  return Restaurant.create({ ...editInfo, userId })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {  
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
          .lean()
          .then(restaurant => res.render('show', { restaurant }))
          .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
          .lean()
          .then(restaurant => res.render('edit', { restaurant }))
          .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const editInfo = req.body
  return Restaurant.findOne({ _id, userId })
          .then(restaurant => {
            for (let info in editInfo) {
              if (!editInfo[info]) continue
              restaurant[info] = editInfo[info]
            }
            return restaurant.save()
          })
          .then(() => res.redirect(`/restaurants/${_id}`))
          .catch(error => console.log(error))
})

module.exports = router