const MessageService = require('../services/message.services')

class messageControllers{
    async getMessage(){
        let message = await MessageService.getMessage()
        return message
    }
    async createMessage(message){
        let newMessage = await MessageService.createMessage(message);
        return newMessage
    }
    async editMessage(id, messageData){
        let updateMessage = await MessageService.editMessage(id, messageData);
    return updateMessage
    }
    async deleteMessage(id){
        let updateMessage = await MessageService.deleteMessage(id);
    return updateMessage
    }
}

module.exports = new messageControllers()