const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
require('./config/mongoose.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const PORT = process.env.PORT
const app = express()

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.static('public')) // setting static files
app.use(methodOverride('_method'))
app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})
app.use(routes)

// start and listen on the Express server
app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})