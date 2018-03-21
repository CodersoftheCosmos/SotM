
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  stats: {
    wins: Number,
    losses: Number,
    favChar: String,
    totDmgDone: Number
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;