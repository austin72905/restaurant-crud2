const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

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

      // 先用 genSalt 產生「鹽」，第一個參數是複雜度係數，預設值是 10
      bcrypt.genSalt(10, (err, salt) =>

        // 再用 hash 把鹽跟使用者的密碼配再一起，然後產生雜湊處理後的 hash
        bcrypt.hash(newUser.password, salt, (err, hash) => {

          if (err) throw err
          newUser.password = hash

          // 用 bcrypt 處理密碼後，再把它儲存起來
          newUser.save()
            .then(user => {
              res.redirect('/')
            })
            .catch(err => console.log(err))


        })

      )

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