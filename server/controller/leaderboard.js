const db = require('../db');
const models = require('../models/index')
const redis = require('redis')
const config = require('../../config')

const client = redis.createClient(config.redis_port, config.redis_host)

client.on('error', function(err) {
  console.log("Error " + err)
})

// client.set('name', "jeremy")
// client.get('name', function(err, result) {
//   console.log(result)
// } )
// client.del('name', function(err, result) {
//   console.log("done")
// })

// client.ZADD("leaderboard", 6, "Jarrett")

// client.ZREVRANGE("leaderboard", 0, -1, "withScores", function(err, result) {
//   console.log(result)
// })

module.exports = {

  board: {
    get: function board(req, res) {
      // client.zrange(list, 0, -1, WITHSCORES)  
      client.ZREVRANGE("LeaderBoard", 0, -1, "withScores", function(err, result) {
        if(result.length === 0) {
          res.send("Leaderboard is not ready")
        } else {
          res.send(result)
        }
      })
    },

    post: function board(req, res) {
      console.log('inside the leaderboard post req');
      models.User.find({ }).exec( (err,data) => {
        if(err){
          console.log('there was an error!', err)
        } 
        data.forEach( (person)=> {
          client.ZADD("LeaderBoard", person.stats.wins, person.username)
        })
        res.send("done")
      })
    }

    

  }
}


