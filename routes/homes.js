const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

//auth.js裡面authenticated物件
const { authenticated } = require('../config/auth')

//首頁
router.get('/', authenticated, (req, res) => {

  Restaurant.find({ userId: req.user._id })
    .exec((err, restaurants) => {
      if (err) return console.log(err)
      res.render('index', { restaurants })
    })

})

module.exports = router