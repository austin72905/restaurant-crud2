const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

//載入範本餐廳資料restaurant.json
const restaurantJson = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')

  //存入種子資料
  const sample = restaurantJson.results

  for (var i = 0; i < sample.length; i++) {
    Restaurant.create(sample[i])
  }
  console.log('done')


})