const mongoose = require('mongoose')
const User = require('../user')
const Restaurant = require('../restaurant')

//載入範本餐廳資料restaurant.json
const restaurantJson = require('./restaurant.json')
//載入範本使用者資料
const userJson = require('./user.json')

//載入bcrypt 產生使用者密碼
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')

  //存入種子資料
  const sample = restaurantJson.results
  const sampleUser = userJson.results

  for (let i = 0; i < sampleUser.length; i++) {

    bcrypt.genSalt(10, (err, salt) => {

      bcrypt.hash(sampleUser[i].password, salt, (err, hash) => {

        if (err) throw err
        sampleUser[i].password = hash
        User.create(sampleUser[i])
          .then(user => {

            for (let u = 0; u < sample.length; u++) {

              Restaurant.create({

                name: sample[u].name,
                name_en: sample[u].name_en,
                category: sample[u].category,
                image: sample[u].image,
                location: sample[u].location,
                phone: sample[u].phone,
                google_map: sample[u].google_map,
                rating: sample[u].rating,
                description: sample[u].description,
                userId: user._id

              })

            }

          })
          .catch(err => console.log(err))

      })
    })

  }
  console.log('done')


})