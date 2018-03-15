const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/users');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('once', function() {
    console.log('Database is connected and listening on Port 27017');
});

let characterSchema = mongoose.Schema({
    name: String,
    hp: Number,
    power: String,
    cardDeck: Array,
    charType: String
});

let userSchema = mongoose.Schema({
    username: String,
    stats: {
      wins: Number,
      losses: Number,
      favChar: String,
      totDmgDone: Number
    }
});

let cardSchema = mongoose.Schema({
    name: String
});

let Card = mongoose.model('Card', cardSchema);

let newCard = (name) => {
  let card = new Card({
    name: name
  });
  card.save((err, card) => {
      if(err) {
          return console.log('Something went wrong while saving ', err);
      }
      console.log('Saved ', card);
  })
}


let Character = mongoose.model('Character', characterSchema);
let User = mongoose.model('User', userSchema);

let newCharacter = (name, hp, power, cardDeck, charType) => {
  let character = new Character({
      name: name, 
      hp: hp, 
      power: power, 
      cardDeck: cardDeck, 
      charType: charType
    });
  character.save((err, character) => {
      if(err) {
          return console.log("Something went wrong while saving. ", err);
      }
      console.log('Saved ', character);
  })
}

let newUser = (username, stats = {wins: 0, losses: 0, favChar: 'Legacy', totDmgDone: 0}) => {
    let user = new User({
      username: username,
      stats: stats
    });
    user.save((err, user) => {
        if(err) {
            console.log("Something went wrong while saving. ", err);
        }
        console.log('Saved ', user);
    })
}

module.exports = {db, newCharacter, newUser, newCard};