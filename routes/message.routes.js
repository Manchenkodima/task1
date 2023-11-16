const express = require('express')
const router = express.Router()
const MessageControllers = require('../controllers/message.controller')


router.get('/', async (req, res) => {
    try{
        const message = await MessageControllers.getMessage()
        res.send(message)
    } catch(err){
        console.log(err)
    }
})
router.post('/create', async (req, res) => {
    try{
        const newMessage = await MessageControllers.createMessage(req.body)
        res.send(newMessage)
    } catch(err){
        console.log(err)
    }
})
router.put('/edit/:id', async (req, res) => {
    try{
        const id = +req.params.id
        const editMessage =  await MessageControllers.editMessage(id, req.body)
        res.send(editMessage)
    } catch(err){
        console.log(err)
    }
})
router.delete('/delete/:id', async (req, res) => {
    try{
        const id = +req.params.id
        const updateMessage =  await MessageControllers.deleteMessage(id)
        res.send(updateMessage)
      } catch (err) {
        console.log(err)
      }
})

module.exports = router