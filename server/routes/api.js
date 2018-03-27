const express = require('express')

const router = express.Router()

const userCtrl = require('../controller/users')
const leaderBoardCtrl = require('../controller/leaderboard')

//username or /:username????

router.get('/username', userCtrl.users.get);
router.post('/username', userCtrl.users.post);
// router.put('/username', userCtrl.users.PUT);
router.get('/leaderboard', leaderBoardCtrl.board.get)
router.post('/leaderboard', leaderBoardCtrl.board.post)



module.exports = router