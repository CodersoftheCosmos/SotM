//run  'node /SotM/server/seed.js' (or the correct path from the file you're in) to seed DB

const mongoose = require('mongoose');

const { newCharacter } = require('./db.js')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/sotm');

const db = mongoose.connection;

db.once('open', () => {
  console.log('connecting to db and preparing to insert data');
  db.dropDatabase();
});

const seedLegacy = require('../../GameData/heroes/legacy.json');
const seedBaron = require('../../GameData/villains/baronBlade.json');
const seedNelson = require('../../GameData/heroes/nelson.json');

console.log('this is it: ', seedLegacy)

newCharacter(seedLegacy.name, seedLegacy.hp, seedLegacy.power, seedLegacy.cardDeck, seedLegacy.charType);
newCharacter(seedBaron.name, seedBaron.hp, seedBaron.power, seedBaron.cardDeck, seedBaron.charType);
newCharacter(seedNelson.name, seedNelson.hp, seedNelson.power, seedNelson.cardDeck, seedNelson.charType);


// newCharacter(seedBaron);
// newCharacter.insertOne(seedLegacy, function(err, result) {
//   if(err) {
//     console.log('something went wrong while adding Legacy', err);
//   } else {
//     console.log('successfully added Legacy to DB')
//   }
// });

// newCharacter.insertOne(seedBaron, function(err, result) {
//   if(err) {
//     console.log('something went wrong while adding Baron Blade', err);
//   } else {
//     console.log('successfully added Baron Blade to DB')
//   }
// });

setTimeout(function(){ db.disconnect }, 1500)

setTimeout(function(){ console.log('Disconnected from DB') }, 1600)

setTimeout(function(){ process.exit() }, 1700)