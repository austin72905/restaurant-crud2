const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

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
//首頁
app.get('/', (req, res) => {

  Restaurant.find((err, restaurants) => {
    if (err) return console.log(err)
    res.render('index', { restaurants })
  })

})

//列出全部restaurant
app.get('/restaurants', (req, res) => {
  res.redirect('/')
})

//新增restaurant 的頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

//新增restaurant  -- >到 '列出全部restaurant的頁面'
app.post('/restaurants', (req, res) => {

  //在new.hbs新增時，存入mongodb
  const restaurant = new Restaurant({
    name: req.body.name,
    rating: req.body.rating,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    description: req.body.description
  })

  restaurant.save((err) => {
    if (err) return console.log(err)
    return res.redirect('/')
  })

})

//顯示detail 的頁面
app.get('/restaurants/:id', (req, res) => {
  res.send('顯示detail 的頁面')
})

//修改restaurant 的頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('新增restaurant 的頁面')
})

//修改restaurant
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('修改restaurant')
})

//刪除restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除restaurant')
})



app.listen(3000, () => {
  console.log('the app is running on http://localhost:3000')
})