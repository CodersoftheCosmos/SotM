const db = require('../db');
const models = require('../models/user')

module.exports = {

  users: {
    get: function getUser(req, res) {
      console.log(req.query.name)
      // console.log('this is models in users.js ', models)
      models.find({ username : req.query.name }).exec( (err,data) => {
        if(err){
          console.log(err)
        } 
        res.send(data)
      })
    },

    post: function inputUser(req, res) {
      console.log(req)
      console.log(req.body.username)
      res.send("hi")
    }

  }
}