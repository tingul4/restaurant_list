// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

const Restaurant = require('./models/restaurant.js')

// use bodyParser to get post form data correctly
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended : true }))

// get password from .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// routes setting
app.get('/', (req, res) => {
  return Restaurant.find()
          .lean()
          .then(restaurants => res.render('index', { restaurants }))
          .catch(error => console.error(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  
  return Restaurant.findByIdAndRemove(id)
          .then(() => res.redirect('/'))
          .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants/new', (req, res) => {
  const editInfo = req.body

  return Restaurant.create(editInfo)
          .then(() => res.redirect('/'))
          .catch(error => console.error(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {  
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
          .lean()
          .then(restaurant => res.render('show', { restaurant }))
          .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  
  return Restaurant.find()
          .lean()
          .then(restaurants => {
            return restaurants.filter(restaurant => {
              return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            })
          })
          .then(restaurants => res.render('index', { restaurants, keyword }))
          .catch(error => console.error(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  return Restaurant.findById(id)
          .lean()
          .then(restaurant => res.render('edit', { restaurant }))
          .catch(error => console.error(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
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

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})