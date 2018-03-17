const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/sotm');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('once', function() {
    console.log('Database is connected and listening on Port 27017');
});

const characterSchema = mongoose.Schema({
    name: String,
    hp: Number,
    power: String,
    cardDeck: Array,
    charType: String
});

const userSchema = mongoose.Schema({
    username: String,
    stats: {
      wins: Number,
      losses: Number,
      favChar: String,
      totDmgDone: Number
    }
});

const cardSchema = mongoose.Schema({
    name: String,
    photo: String
});

const Card = mongoose.model('Card', cardSchema);

const newCard = (name, photo) => {
  const card = new Card({
    name: name,
    photo: photo
  });
  card.save((err, card) => {
      if(err) {
          return console.log('Something went wrong while saving ', err);
      }
      console.log('Saved ', card);
  })
}


const Character = mongoose.model('Character', characterSchema);
const User = mongoose.model('User', userSchema);

const newCharacter = (name, hp, power, cardDeck, charType) => {
  const character = new Character({
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

const newUser = (username, stats = {wins: 0, losses: 0, favChar: 'Legacy', totDmgDone: 0}) => {
    const user = new User({
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