const LocalStrategy = require('passport-local').Strategy
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