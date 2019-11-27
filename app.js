const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('app')
})

app.listen(3000, () => {
  console.log('the app is running on http://localhost:3000')
})