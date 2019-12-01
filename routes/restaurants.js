const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//列出全部restaurant
router.get('/', (req, res) => {
  res.redirect('/')
})

//新增restaurant 的頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//新增restaurant  -- >到 '列出全部restaurant的頁面'
router.post('/', (req, res) => {

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
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, detail) => {
    if (err) return console.log(err)
    return res.render('detail', { detail })
  })

})

//修改restaurant 的頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    return res.render('edit', { restaurant })
  })


})

//修改restaurant
router.put('/:id/edit', (req, res) => {
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
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.log(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
})


//set search route
router.get(
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

router.get(
  '/sort/:sort', (req, res) => {

    const sort = req.params.sort
    Restaurant.find({})
      .sort({ rating: `${sort}` })
      .exec((err, restaurants) => {

        if (err) return console.log(err)
        res.render('index', { restaurants })
      })
  }
)



module.exports = router