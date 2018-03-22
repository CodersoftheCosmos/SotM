const express = require('express')

const router = express.Router()

const userCtrl = require('../controller/users')

//username or /:username????

router.get('/username', userCtrl.users.get);
router.post('/username', userCtrl.users.post);
// router.put('/username', userCtrl.users.PUT);



module.exports = router