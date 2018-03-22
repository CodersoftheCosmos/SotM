const db = require('../db');
const models = require('../models/index')

module.exports = {

  users: {
    get: function getUser(req, res) {
      models.User.find({ username : req.query.username }).exec( (err,data) => {

        if(err){
          console.log(err)
        } 
        res.send(data)
      })
    },

    post: function inputUser(req, res) {
      // console.log('inside post function', req.body)
      // res.send()

      (new models.User({
        username: req.body.username,
        stats: {
          wins: req.body.stats.wins,
          losses: req.body.stats.losses,
          favChar: req.body.stats.favChar,
          totDmgDone: req.body.stats.totDmgDone
        }    
      })).save().then((data) => {
        res.status(201).json(data);
      })
      // res.send(req.body)

  
    },

    put : function updateUser(req, res){
      models.User.update({username: req.body.username}, req.body)
        .then( (err, data)=> {
          res.send("done")
      })
    }

  }
}
