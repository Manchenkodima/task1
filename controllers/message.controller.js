const MessageService = require('../services/message.services')
const { validationResult } = require('express-validator');

class messageControllers {
    async getMessage(req, res) {
        try {
            const message = await MessageService.getMessage()
            return res.send(message)
        } catch (error) {
            console.log(error);
            Sentry.captureException(error)
        }
    }
    async createMessage(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const newMessage = await MessageService.createMessage(req.body)
            return res.send(newMessage)
        } catch (error) {
            Sentry.captureException(error)
        }
    }
    async editMessage(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const id = +req.params.id
            const editMessage = await MessageService.editMessage(id, req.body)
            return res.send(editMessage)
        } catch (error) {
            Sentry.captureException(error)
        }
    }

    async deleteMessage(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() })
            }
            const min = +req.query.min
            const max = +req.query.max
            const updateMessage = await MessageService.deleteMessage(min, max)
            return res.send(updateMessage)
        } catch (err) {
            Sentry.captureException(error)
        }
    }
}


module.exports = new messageControllers()
