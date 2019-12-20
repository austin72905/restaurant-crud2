const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

//session
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)

// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  //辨識使用者是否登入
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

//use css file
app.use(express.static('public'))

//連線到mongodb
mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

//載入models
const Restaurant = require('./models/restaurant')




//route
app.use('/', require('./routes/homes'))

app.use('/restaurants', require('./routes/restaurants'))

app.use('/users', require('./routes/users'))



app.listen(3000, () => {
  console.log('the app is running on http://localhost:3000')
})