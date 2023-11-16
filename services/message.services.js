const { rejects } = require('assert')
const fs = require('fs')
const { resolve } = require('path')

class MessageService {
    getMessage() {
        return new Promise((res, rej) => {
            fs.readFile('message.json', 'utf8', (error, message) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(message)
                    res(obj)
                }
            })
        })
    }
    createMessage(newMessage){
        return new Promise((res, rej) => {
            let message = fs.readFile('message.json', 'utf8', (error, message) => {
                if (error) {
                    rej(error)
                } else {
                    const obj = JSON.parse(message)
                    obj.push(newMessage)
                    fs.writeFile('message.json', JSON.stringify(obj, null, 3), (err, message) => {
                        if (err) {
                            rej(err)
                        } else {
                            res(obj)
                        }
                    })
                }
            })
        })
    }
    editMessage(id, messageData){
        return new Promise((res, rej) => {
            fs.readFile('message.json', 'utf8', (err, message) => {
                if(err){
                    rej(err)
                } else {
                    const obj = JSON.parse(message)
                    const index = obj.findIndex(item => item.id === id)
                    if(index === -1 ){
                        rej('Не существует')
                    } else {
                        const updateMessage = {...obj[index], ...messageData}
                        obj[index] = updateMessage
                        fs.writeFile('message.json', JSON.stringify(obj,null,3), 'utf8', err => {
                            if(err){
                                rej(err)
                            } else {
                                res(obj)
                            }
                        })
                    }
                }
            })
        })
    }
    deleteMessage(id){
        return new Promise((resolve, rejects) => {
            fs.readFile('message.json', 'utf8', (error, message) => {
                if(error){
                    rejects(error)
                } else {
                    const obj = JSON.parse(message)
                    const index = obj.findIndex(item => item.id === id)
                    obj.splice(index, 1)
                    fs.writeFile('message.json', JSON.stringify(obj, null, 3), 'utf8', error => {
                        if(error){
                            rejects(error)
                        } else {
                            resolve(obj)
                        }
                    })
                }
            })
        })
    }
}

module.exports = new MessageService()