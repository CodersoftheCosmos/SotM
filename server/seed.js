//run  'node /SotM/server/seed.js' (or the correct path from the file you're in) to seed DB

const mongoose = require('mongoose');

const { newCharacter } = require('./db.js')

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://127.0.0.1/sotm');
console.log('this is db: ', db)
db.dropDatabse();

db.once('open', () => {
  console.log('connecting to db and preparing to insert data');
});

const seedLegacy = require('../../GameData/heroes/legacy.json');
const seedBaron = require('../../GameData/heroes/baronBlade.json');

newCharacter.insert(seedLegacy, function(err, result) {
  if(err) {
    console.log('something went wrong while adding Legacy', err);
  } else {
    console.log('successfully added Legacy to DB')
  }
});

newCharacter.insert(seedBaron, function(err, result) {
  if(err) {
    console.log('something went wrong while adding Baron Blade', err);
  } else {
    console.log('successfully added Baron Blade to DB')
  }
});

setTimeout(function(){ db.disconnect }, 1500)

setTimeout(function(){ console.log('Disconnected from DB') }, 1600)

setTimeout(function(){ process.exit() }, 1700)