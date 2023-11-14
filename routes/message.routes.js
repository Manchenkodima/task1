const express = require('express')
const router = express.Router()
const messageController = require('../controllers/message.controller')
const peopleController = require('../controllers/people.controller')

router.get('/')
router.post('/create')
router.put('/edit')
router.delete('/delete')

module.exports = router