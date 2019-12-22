const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')
const { authenticated } = require('../config/auth')

//set search route
router.get(
  '/', authenticated, (req, res) => {


    const keyword = req.query.keyword

    Restaurant.find({ userId: req.user._id })
      .exec((err, restaurants) => {

        if (err) return console.log(err)

        const search = restaurants.filter(

          (restaurant) => {
            return (
              restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
              restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) ||
              restaurant.category.toLowerCase().includes(keyword.toLowerCase())
            )
          }

        )

        res.render('index', { restaurants: search, keyword })
      })


  }
)

module.exports = router