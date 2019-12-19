const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/user')

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
          if (user.password != password) {
            return done(null, false, { message: 'password is not correct!' })
          }

          return done(null, user)
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