const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')

//登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//登入檢查
router.post('/login', (req, res, next) => {
  //res.send('login')
  passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: '/users/login',
  })(req, res, next)
})

//註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})
//註冊檢查
router.post('/register', (req, res) => {

  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const password2 = req.body.password2

  User.findOne({ email: email }).then(user => {

    if (user) {
      console.log('user is already existed')
      res.render('register', {
        name, email, password, password2
      })
    } else {

      const newUser = new User({
        name, email, password
      })

      newUser.save()
        .then(user => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    }
  })
})

//登出
router.get('/logout', (req, res) => {

  //執行 Passport 提供的 req.logout() 這個函數來清除 server的session，同時讓browser的session失效
  req.logout()
  res.redirect('/users/login')
})

module.exports = router