const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()

router.delete('/:id', (req, res) => {
  const id = req.params.id
  
  return Restaurant.findByIdAndRemove(id)
          .then(() => res.redirect('/'))
          .catch(error => console.error(error))
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const editInfo = req.body

  return Restaurant.create(editInfo)
          .then(() => res.redirect('/'))
          .catch(error => console.error(error))
})

router.get('/:restaurant_id', (req, res) => {  
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
          .lean()
          .then(restaurant => res.render('show', { restaurant }))
          .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
          .lean()
          .then(restaurant => res.render('edit', { restaurant }))
          .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const editInfo = req.body

  return Restaurant.findById(id)
          .then(restaurant => {
            for (let info in editInfo) {
              if (!editInfo[info]) continue
              restaurant[info] = editInfo[info]
            }
            return restaurant.save()
          })
          .then(() => res.redirect(`/restaurants/${id}`))
          .catch(error => console.error(error))
})

module.exports = router