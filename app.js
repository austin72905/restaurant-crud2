const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))


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