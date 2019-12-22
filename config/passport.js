const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = passport => {

  passport.use(

    new LocalStrategy(

      { usernameField: 'email' }, (email, password, done) => {
        User.findOne({
          email: email
        }).then((user) => {

          if (!user) {
            return done(null, false, { message: 'this email is not registed!' })
          }

          //用bcrypt來比較
          bcrypt.compare(password, user.password, (err, isMatch) => {

            if (err) return err

            if (isMatch) {
              return done(null, user)
            } else {

              return done(null, false, { message: 'Email and Password incorrect' })
            }

          })


        })
      }
    )
  )

  //facebook-strategy
  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,

      //加這個才能拿到使用者名稱
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {

      User.findOne({
        email: profile._json.email
      }).then(user => {

        if (!user) {

          //0~10,a~z, pick last 8 number
          // 因為密碼是必填欄位，所以我們可以幫使用者隨機產生一組密碼，然後用 bcrypt 處理，再儲存起來
          var randomPassword = Math.random().toString(36).slice(-8)

          bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(randomPassword, salt, (err, hash) => {

              var newUser = User({
                name: profile._json.name,
                email: profile._json.email,
                //facebook會給使用者的name、email，但password是required，所以我們自己幫使用者設密碼
                password: hash,
              })

              newUser.save().then(user => {
                return done(null, user)
              })

            })
          })

        } else {
          return done(null, user)
        }
      })

    })
  )



  //序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })


}