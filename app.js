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
  Restaurant.findById(req.params.id, (err, detail) => {
    if (err) return console.log(err)
    return res.render('detail', { detail })
  })

})

//修改restaurant 的頁面
app.get('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', { restaurant })
  })


})

//修改restaurant
app.post('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)

    restaurant.name = req.body.name
    restaurant.rating = req.body.rating
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.description = req.body.description
    //存入資料庫
    restaurant.save(err => {
      if (err) return console.log(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })

  })

})




//刪除restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})


//set search route
app.get(
  '/search', (req, res) => {

    Restaurant.find((err, restaurants) => {

      if (err) return console.log(err)

      const search = restaurants.filter(

        restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())

      )

      res.render('index', { restaurants: search, keyword: req.query.keyword })
    })


  }
)





app.listen(3000, () => {
  console.log('the app is running on http://localhost:3000')
})