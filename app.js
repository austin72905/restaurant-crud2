const express = require('express')
const app = express()
const mongoose = require('mongoose')

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

app.get('/', (req, res) => {
  res.send('app')
})

app.listen(3000, () => {
  console.log('the app is running on http://localhost:3000')
})