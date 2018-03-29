const axios = require('axios');
const leaderboardCtrl = require('./controller/leaderboard')

const updateLeaderboard = () => {
  console.log('this is the leadboard updater')
  axios.post('http://localhost:9001/api/leaderboard')
  .then( (response) => {
    console.log('Success! Updated leaderboard', response)
    return 'finished';
  })
  .catch( (err) => {
    console.log('Error updating leaderboard! ', err)
  });

}

// axios.get('http://localhost:9001')
// .then( (response) => {
//       console.log('Success! Updated leaderboard', response)
//     })
//     .catch( (err) => {
//       console.log('Error updating leaderboard! ', err)
//     });

// console.log('this is inside leaderboardUpdater!!!!!!!!!')
updateLeaderboard();