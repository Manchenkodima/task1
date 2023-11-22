const express = require('express')
const router = express.Router()
const MessageControllers = require('../controllers/message.controller')
const {body, param, query, validationResult} = require('express-validator')

const validateDataBody = [
    body('id').isInt().withMessage('ID только число'),
    body('message').isString().isLength({min: 2, max: 100}).withMessage('Сообщение должно быть min 2 символа')
]

const validateDataId = param("id").isInt().withMessage("Такого ID не существует");

const validateDataQuery = [
    query('min').isInt().withMessage('ID начала удаления только число'),
    query('max').isInt().withMessage('ID конец удаления только число')]

router.get('/', MessageControllers.getMessage)

router.post('/create', validateDataBody, MessageControllers.createMessage)

router.put('/edit/:id', validateDataId, MessageControllers.editMessage)

router.delete('/delete/filter', validateDataQuery, MessageControllers.deleteMessage)

module.exports = router