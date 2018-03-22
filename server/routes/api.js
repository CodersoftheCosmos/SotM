const express = require('express')

const router = express.Router()

const userCtrl = require('../controller/users')

//username or /:username????

router.get('/username', userCtrl.users.GET);
router.post('/username', userCtrl.users.POST);
router.put('/username', userCtrl.users.PUT);



module.exports = router