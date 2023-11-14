const express = require('express')
const router = express.Router()
const peopleRourtes = require('./people.routes')
const messageRourtes = require('./message.routes')

router.use('/people', peopleRourtes)
router.use('/message', messageRourtes)


module.exports = router



